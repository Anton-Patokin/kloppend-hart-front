<?php
namespace dataMining2\factory;

require_once (ROOT . 'twitter/factory/TwitterFactory.class.php');
require_once (ROOT . 'poi/factory/PoiFactory.class.php');
require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'source/model/SourceReference.class.php');

require_once (ROOT . 'dataMining2/dao/TwitterDataMiningDAO.class.php');

require_once (ROOT . 'matching/factory/MatchingFactory2.class.php');
require_once (ROOT . 'source/model/SourceReferencePoiMatch.class.php');

class TwitterDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $source_name = 'twitter';
    protected $twitterFactory;
    
    protected $apiLimit = 150;
    protected $apiLimitInterval = 900; //15 minutes
    
    public function __construct() {
        parent::__construct();
        $this->twitterFactory = new \twitter\factory\TwitterFactory();
        $this->twitterDataMiningDAO = new \dataMining2\dao\TwitterDataMiningDAO();
        $this->matchingFactory = new \matching\factory\MatchingFactory2();
    }
    
    public function postRelevantReferencesHandler(&$references, &$sourceReferences) {
        foreach($references as $reference){
            if(property_exists($reference, 'poi_id')){
                //propose match
                $sourceReference = $this->sourceReferenceFactory->getSourceReferenceByReference($reference->screen_name, $this->source_id);

                $match = new \source\model\SourceReferencePoiMatch();
                $match->source_reference_id = $sourceReference->source_reference_id;
                $match->poi_id = $reference->poi_id;
                $match->type = '2';
                $match->score = 0;
                unset($match->is_match);
                
                $this->matchingFactory->saveMatches(array($match), false);
            }
        }
    }
    
    protected function getReferencesFromSource($city_id)
    { 
        $poiFactory = new \poi\factory\PoiFactory();
        
        $timeFrame = date('Y-m-d H:i:s', (time() - $this->apiLimitInterval));
        $callsInTimeframe = $this->twitterDataMiningDAO->getTotalFetchedSince($timeFrame);

        if($callsInTimeframe >= $this->apiLimit)
            throw new \Exception("Twitter doesn't allow more then $this->apiLimit calls per $this->apiLimitInterval seconds.");
        else
            $limit = $this->apiLimit - $callsInTimeframe;
        
        $lastFetchedSourceReference = $this->twitterDataMiningDAO->getLastFetched();
        if(count($lastFetchedSourceReference))
        $lastFetchedSourceReference = $lastFetchedSourceReference[0]['poi_id'];
        //testing
        $limit = 35;
        
        //in twitter's case, we get our references by apen poi's
        $pois = $poiFactory->getPoisRangeFrom($city_id, $lastFetchedSourceReference, $limit);

        $references = $this->createSourceReferencesByPois($pois);
        
        $this->logPois($pois);
        
        return $references;
    }
    
    protected function convertReference($reference){
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference  = $reference->screen_name;
        $sourceReference->reference_name    = $reference->name;
        $sourceReference->source_id         = $this->source_id;
        $sourceReference->latitude          = null;
        $sourceReference->longitude         = null;

        return $sourceReference;
    }
    
    private function createSourceReferencesByPois($pois){
        $result = array();
        $requiredLocations = array('antwerp', 'antwerpen', 'belgium', 'belgie', 'belgië');
        foreach($pois as $poi){
            $apiResults = $this->twitterFactory->createSourceReferencesByName($poi->name);
            
            $results = array();
            foreach($apiResults as $apiResult){
                if(in_array(strtolower($apiResult->location), $requiredLocations)){
                    //add poi->name to tiwtter user result. matching later will be much easier
                    $apiResult->poi_id = $poi->poi_id;
                    $results[] = $apiResult;
                }
            }
            
            if(!empty($results))
            $result = array_merge($result, $results);
        }
        return $result;
    }
    
    private function logPois($pois){
        foreach($pois as $poi){
            $object = new \stdClass();
            $object->poi_id = $poi->poi_id;
            $object->last_fetched = date('Y-m-d H:i:s');
            
            if(!count($this->twitterDataMiningDAO->getById($poi->poi_id)))
                $this->twitterDataMiningDAO->updateRecordByPrimaryKey($object, array($object->last_fetched), array('poi_id'));
            else
                $this->twitterDataMiningDAO->insertRecord($object);
        }
    }
    
     protected function getMetricsBySourceReference($sourceReference){
        $metrics = $this->twitterFactory->createMetricsFromReference($sourceReference->source_reference);
        return $metrics;
    }
    
}

?>
