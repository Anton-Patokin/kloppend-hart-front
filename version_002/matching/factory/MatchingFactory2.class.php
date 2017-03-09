<?php

namespace matching\factory;

require_once (ROOT . 'core/factory/GenericFactory.class.php');
require_once (ROOT . 'source/factory/SourceFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiMatchFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferenceFactory.class.php');
require_once (ROOT . 'poi/factory/PoiFactory.class.php');
require_once (ROOT . 'source/model/SourceReferencePoi.class.php');
require_once (ROOT . 'source/model/SourceReferencePoiMatch.class.php');

class MatchingFactory2 extends \core\factory\GenericFactory{
    
    protected $source_id;
    protected $source_name;
    
    public function __construct(){
        $this->sourceFactory = new \source\factory\SourceFactory();
        $this->poiFactory    = new \poi\factory\PoiFactory();
        $this->sourceReferenceFactory = new \source\factory\SourceReferenceFactory();
        $this->sourceReferencePoiMatchFactory = new \source\factory\SourceReferencePoiMatchFactory();
        $this->source_id = $this->sourceFactory->createSourceByName($this->source_name)->source_id;
    }
    
    public function matchRelevantReferences($cityId, $limit = 1000){
        $unlinkedSourceReferences = $this->sourceReferenceFactory->createUnlinkedSourceReferencesBySourceId($this->source_id, $cityId, $limit);
        $pois = $this->poiFactory->getPoisByCityId($cityId);
        return $this->matchUnlinkedSourceReferences($unlinkedSourceReferences, $pois);
    }
    
    protected function matchUnlinkedSourceReferences($unlinkedSourceReferences, &$pois){
        foreach($unlinkedSourceReferences as $unlinkedSourceReference){
            $matches = $this->matchSourceReference($unlinkedSourceReference, $pois);
            
            //insert matches (NOT YET source_reference__poi)
            $this->saveMatches($matches, false);
            
            $unlinkedSourceReference->last_matched = date('Y-m-d H:i:s');
            $this->sourceReferenceFactory->updateSourceReference($unlinkedSourceReference);
        }
        return count($unlinkedSourceReferences);
    }
    
    //override this function. match conditions can be specific to each source
    protected function matchSourceReference($sourceReference, &$pois){
        return $this->standardMatching($sourceReference, $pois);
    }
    
    
    //added -> needs to be reviewed
    private function saveSourceReferencePoiMetric(){
        $sourceReference = $this->sourceReferenceFactory->getSourceReferenceById($sourceReferencePoi->source_reference_id);
        $sourceMetrics = $this->sourceMetricFactory->createSourceMetricsBySourceId($sourceReference->source_id);
        foreach($sourceMetrics as $sourceMetric){
            $sourceReferencePoiMetric = new \source\model\SourceReferencePoiMetric();
            $sourceReferencePoiMetric->source_reference_poi_id = $sourceReferencePoi->source_reference_poi_id;
            $sourceReferencePoiMetric->metric_id               = $sourceMetric->metric_id;
            $this->sourceReferencePoiMetricFactory->saveSourceReferencePoiMetric($sourceReferencePoiMetric);
        }
    }
    
    private function standardMatching($sourceReference, &$pois){
        $matches = array();
        $nameMatchThreshold = 50;
        
        foreach($pois as $poi){
            $geoMatch = $this->matchOnGeoLocation($sourceReference, $poi);
            $nameMatchScore = $this->matchOnName($sourceReference, $poi);

            if($geoMatch || $nameMatchScore >= $nameMatchThreshold){
                $match = new \source\model\SourceReferencePoiMatch();
                $match->source_reference_id = $sourceReference->source_reference_id;
                $match->poi_id = $poi->poi_id;
                
                // bit - bitAnd values for type of match
                if($geoMatch) $match->type = '1';
                if($nameMatchScore >= $nameMatchThreshold) $match->type = '2';
                if($geoMatch && $nameMatchScore >= $nameMatchThreshold) $match->type = "3";
                
                //determine matchScore (TODO: take geomatch in to account)
                $match->score = $nameMatchScore;
                
                unset($match->is_match);
                
                $matches[] = $match;
            }
        }   
        return $matches;
    }
    
    //true on geolocations not more then $maxDistance meters apart
    private function matchOnGeoLocation(&$sourceReference, &$poi, $maxDistance = 20){
        $distance = 3958.75 * acos(  sin($poi->latitude/57.2958) * sin($sourceReference->latitude/57.2958) +
                    cos($poi->latitude/57.2958) * cos($sourceReference->latitude/57.2958) * cos($sourceReference->longitude/57.2958 - $poi->longitude/57.2958));
        $distance = $distance * 1609.344; //convert to meters
        return ($distance > $maxDistance) ? false: true;
    }
    
    //standard name matching
    private function matchOnName(&$sourceReference, &$poi){
        
        $margin = 50;
        
        $scoreFactor    = 1;
        $word1          = trim(strtolower($sourceReference->reference_name));
        $word2          = trim(strtolower($poi->name));
        
        $levenshtein    = levenshtein($word1, $word2);
        $score = 100 - ($levenshtein / (strlen($word2) / 100)) * $scoreFactor;
        //levenshtein too big? trim prefixes
        if($score > $margin + 15){
             return $score;
        }else{
            $scoreFactor    = 2;
            $trimWords      = array('de','het', '\\\'t', '\\\'s', 'restaurant', 'café', 'hotel', 'antwerpen', 'straat');
            
            $word1 = preg_replace('/\\b('.implode('|', $trimWords).')\\b/', ' ', $word1);
            $word2 = preg_replace('/\\b('.implode('|', $trimWords).')\\b/', ' ', $word2);

            $levenshtein = levenshtein($word1, $word2);
            $score = 100 - ($levenshtein / (strlen($word2) / 100)) * $scoreFactor;
        }
        
        //levenshtein still too big?
        //remove special chars
        if($score > $margin){
             return $score;
        }else{
            $scoreFactor = 4;
            
            $word1 = preg_replace('/[&\\-\\.\\,]/', '', $word1);
            $word2 = preg_replace('/[&\\-\\.\\,]/', '', $word2);
            
            $levenshtein = levenshtein($word1, $word2);
            $score = 100 - ($levenshtein / (strlen($word2) / 100)) * $scoreFactor;
        }
        
        //levenshtein still too big?
        //remove small words out for long names only
        if($score > $margin){
            $scoreFactor = 10; //heavy factor. must be near perfect match to pass
            
            $word1 = preg_replace('/\\b\\w{1,2}\\b/', ' ', $word1);
            $word2 = preg_replace('/\\b\\w{1,2}\\b/', ' ', $word2);
            //TODO: write condition for words that are now empty
            $levenshtein = levenshtein($word1, $word2);
            $score = 100 - ($levenshtein / (strlen($word2) / 100)) * $scoreFactor;
            
        }
        //echo "<hr />100 - ($levenshtein / ".strlen($word2).")^2 * 100 * $scoreFactor = ";
        
        return $score;
    }
    
    //save all matches to db. NOTE: is_match flag is unset. this process does not influence manual match flags
    public function saveMatches($matches, $saveIsMatchedFlag = false){
        foreach($matches as $match){
            if(!$saveIsMatchedFlag) unset($match->is_match);
            $this->sourceReferencePoiMatchFactory->saveSourceReferencePoiMatch($match);
        }
    }
}

?>
