<?php
    namespace dataMining\factory;
    require_once ('../core/factory/GenericFactory.class.php');
    require_once('../source/factory/SourceReferenceFactory.class.php');
    require_once('../source/factory/SourceMetricFactory.class.php');
    require_once ('../poi/factory/PoiFactory.class.php');
    require_once ('../source/factory/SourceFactory.class.php');
    require_once ('../apen/factory/ApenLocatedNodeFactory.class.php');
    
    class DataMiningFactory extends \core\factory\GenericFactory {
        public $sourceReferenceFactory;
        public $sourceMetricFactory;
        public $poiFactory;
        public $sourceFactory;
        public $apenNodeFactory;

        public $cityId = 1;
        public $source;
        public $factoryType;

        public function __construct() {
            $this->sourceFactory = new \source\factory\SourceFactory();
            $this->sourceReferenceFactory = new \source\factory\SourceReferenceFactory();
            $this->sourceMetricFactory = new \source\factory\SourceMetricFactory();
            $this->poiFactory = new \poi\factory\PoiFactory();
            $this->apenNodeFactory = new \apen\factory\ApenLocatedNodeFactory();
        }

        public function setType($factoryType){
            $this->factoryType = $factoryType;
            $this->source = $this->sourceFactory->createSourceByName($factoryType);
        }
        
        public function setCityId($cityId){
            $this->cityId = $cityId;
        }
        
        public function getSource(){
            return $this->source;
        }
        
        /***********************************/
        /* Generic poi reference functions */
        /***********************************/
        public function getAllPois(){
            return $this->poiFactory->createAll();
        }
        
        public function getLinkedPois($sourceId = NULL){
            if(empty($sourceId)) $sourceId = $this->source->source_id;
            return $this->poiFactory->createtLinkedPoiBySourceId($sourceId);
        }
        
        /********************************/
        /* Generic apen nodes functions */
        /********************************/
        public function getAllApenNodes(){
            return $this->apenNodeFactory->createAllLocatedNodes();
        }
        
        /**************************************/
        /* Generic source reference functions */
        /**************************************/        
        public function saveSourceReference($sourceReference){
            $this->sourceReferenceFactory->saveSourceReference($sourceReference);
        }

        public function getLinkedSourceReferences($sourceId = NULL){
            if(empty($sourceId)) $sourceId = $this->source->source_id;
            return $this->sourceReferenceFactory->createLinkedSourceReferencesBySourceId($sourceId);
        }

        public function getLinkedSourceReferencesByRange($fromSourceReferenceId, $toSourceReferenceId, $sourceId = NULL){
            if(empty($sourceId)) $sourceId = $this->source->source_id;      
            return $this->sourceReferenceFactory->createLinkedSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId);
        }
        
        /*********************************************/
        /* Generic source_metric reference functions */
        /*********************************************/ 
        public function getSourceMetrics($sourceId = NULL){
            if(empty($sourceId)) $sourceId = $this->source->source_id;
            return $this->sourceMetricFactory->createSourceMetricsBySourceId($sourceId);
        }
        
        /*********************************/
        /* Generic data mining functions */
        /*********************************/ 
        //creation of source references & poi + matching them and linking them from apen nodes
        // THIS NEEDS REFACTORING -> separate steps
        
        //creation of pois has been moved to apenservice
        public function createPoisAndSourceReferencesFromApenNodes($nodes = NULL){
            if(empty($nodes)) $nodes = $this->getAllApenNodes();
            $linkedPois = $this->getLinkedPois();
            $linkedSourceReferences = $this->getLinkedSourceReferences();
            foreach ($nodes as $node) {
                $this->createPoisAndSourceReferencesFromApenNode($node, $linkedPois, $linkedSourceReferences);
            }
        }
        
        public function createPoisAndSourceReferencesFromApenNode($node, $linkedPois = NULL, $linkedSourceReferences = NULL){
            if(empty($linkedPois)) $linkedPois = $this->getLinkedPois();
            if(empty($linkedSourceReferences)) $linkedSourceReferences = $this->getLinkedSourceReferences();
            $poi = NULL;
            if(!$this->nodeHasMatchedPoi($node, $linkedPois)) $poi = $this->createPoiFromApenNode($node);
            $sourceReferences = $this->createSourceReferencesFromApenNode($node);
            var_dump($sourceReferences);
            foreach ($sourceReferences as $sourceReference) {
                if(!empty($poi)) $this->matchPoiToSourceReference($poi, $sourceReference);
                if(!$this->sourceReferenceHasBeenLinked($sourceReference, $linkedSourceReferences))
                    $this->sourceReferenceFactory->saveSourceReference($sourceReference);
            }
        }
        
        public function createPoiFromApenNode($node){
            require_once ('../poi/model/Poi.class.php');
            $newPoi = new \poi\model\Poi();
            $newPoi->name = $node->title;
            $newPoi->nid = $node->nid;
            $newPoi->city_id = $this->cityId;
            $newPoi->poi_id = $this->poiFactory->savePoi($newPoi);
            return $newPoi;
        }
        
        public function nodeHasMatchedPoi($node, $linkedPois){
            foreach ($linkedPois as $linkedPoi) {
                if($node->nid = $linkedPoi->nid) return TRUE;
            }
            return FALSE;
        }
        
        //source references will not be created from nodes but from geolocation or pois
        public function createSourceReferencesFromApenNode($node){
            throw new \Exception('Override createSourceReferencesFromApenNode to create an array of source reference from the api');
        }
        
        public function sourceReferenceHasBeenLinked($sourceReference, $linkedSourceReferences){
            foreach ($linkedSourceReferences as $linkedSourceReference) {
                if($sourceReference->source_reference == $linkedSourceReference->source_reference && $sourceReference->source_id == $linkedSourceReference->source_id)
                    return TRUE;
            }
            return FALSE;
        }
        
        //matchmaking should be moved to own factory
        public function matchPoiToSourceReference($poi, $sourceReference){
            $match = false;
            $matchScore = 0;
		
            $poiName = strtolower($poi->name);
            $referenceName = strtolower($sourceReference->reference_name);
		
            if($poiName == $referenceName){
                $match = true;
                $matchScore = 100;
                require_once ('../source/model/SourceReferencePoi.class.php');
                $sourceReferencePoi = new \source\model\SourceReferencePoi();
                $sourceReferencePoi->poi_id = $poi->poi_id;
                $sourceReferencePoi->source_reference_id = $sourceReference->source_reference_id;
                require_once ('../source/factory/SourceReferencePoiFactory.class.php');
                $sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
                $sourceReferencePoiFactory->saveSourceReferencePoi($sourceReferencePoi);
            }
            
            if(!$match){
		//levenshtein -> compares two strings
		//this could be improved with more algorithms
		$lev = levenshtein($poiName, $referenceName);		
		if($lev < 3){$match = true; $matchScore = 90;}
		if($lev >= 3 && $lev <= 5){$match = true; $matchScore = 80;}
		if($lev >= 5 && $lev <= 7){$match = true; $matchScore = 70;}
		if($lev >= 7 && $lev <= 9){$match = true; $matchScore = 60;}
		if($lev >= 9 && $lev <= 11){$match = true; $matchScore = 50;}
		if($lev >= 11 && $lev <= 13){$match = true; $matchScore = 40;}
		if($lev >= 13 && $lev <= 15){$match = true; $matchScore = 30;}
		if($lev >= 15 && $lev <= 17){$match = true; $matchScore = 20;}
		if($lev >= 17 && $lev <= 19){$match = true; $matchScore = 10;}
            }
            
            if($match) {
                require_once ('../source/model/SourceReferencePoiMatch.class.php');
                $sourceReferencePoiMatch = new \source\model\SourceReferencePoiMatch();
                $sourceReferencePoiMatch->poi_id = $poi->poi_id;
                $sourceReferencePoiMatch->source_reference_id = $sourceReference->source_reference_id;
                $sourceReferencePoiMatch->match_score = $matchScore;
                $sourceReferencePoiMatch->is_equal = $matchScore == 100 ? TRUE : FALSE;
                require_once ('../source/model/SourceReferencePoiMatchFactory.class.php');
                $sourceReferencePoiMatchFactory = new \source\factory\SourceReferencePoiMatchFactory();
                $sourceReferencePoiMatchFactory->saveSourceReferencePoiMatch($sourceReferencePoiMatch);
            }
        }
        
        public function convertApiModelsToSourceReferences($apiModels){
            $sourceReferences = array();
            foreach ($apiModels as $apiModel) {
                $sourceReferences[] = $this->convertApiModelToSourceReference($apiModel);
            }
            return $sourceReferences;
        }
        
        public function convertApiModelToSourceReference($apiModel){
            throw new \Exception('Override convertApiModelToSourceReference to convert an api model to a source reference');
        }
        
    }
?>