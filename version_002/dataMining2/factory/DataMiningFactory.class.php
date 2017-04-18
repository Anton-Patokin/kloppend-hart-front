<?php

namespace dataMining2\factory;

require_once (ROOT . 'core/factory/GenericFactory.class.php');
require_once (ROOT . 'source/model/SourceReference.class.php');
require_once (ROOT . 'source/model/SourceReferencePoiMetric.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceFactory.class.php');
require_once (ROOT . 'source/factory/SourceMetricFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferenceFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiMetricFactory.class.php');
require_once (ROOT . 'aggregated/factory/PoiStatFactory.class.php');
require_once (ROOT . 'aggregated/model/PoiStat.class.php');

class DataMiningFactory  extends \core\factory\GenericFactory {
    
    protected $sourceReferenceFactory;
    protected $sourceReferencePoiFactory;
    protected $sourceFactory;
    protected $sourceCityGeolocationFactory;
    protected $sourceMetricFactory;
    protected $sourceReferencePoiMetricFactory;
    protected $poiStatFactory;
    
    protected $source_name;
    protected $source_id;
    
    protected $sourceCityGeolocationLimit;
    
    public function __construct() {
        parent::__construct(new \source\model\SourceReference());
        $this->sourceReferenceFactory = new \source\factory\SourceReferenceFactory();
        $this->sourceFactory = new \source\factory\SourceFactory();
        $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        $this->sourceMetricFactory = new \source\factory\SourceMetricFactory();
        $this->sourceReferencePoiMetricFactory =  new \source\factory\SourceReferencePoiMetricFactory();
        $this->poiStatFactory = new \aggregated\factory\PoiStatFactory();
        $this->source_id = $this->sourceFactory->createSourceByName($this->source_name)->source_id;
    }
    
    /*entry point. Controls flow of mining for relevant references*/
    public function getRelevantReferences($city_id) {
        //get references from source
        $references = $this->getReferencesFromSource($city_id);

        //convert them to SourceReference instances
        $sourceReferences = $this->convertReferences($references);
        
        $this->createRelevantReferences($sourceReferences);
        
        //possibility to do some final manipulation
        $this->postRelevantReferencesHandler($references, $sourceReferences);
    }
    
    public function createRelevantReferences($sourceReferences){
        $sourceReferenceIds = array_map(function($val) {return $val->source_reference;}, $sourceReferences);
        $existingSourceReferences = $this->sourceReferenceFactory->getExistingSourceReferencesBySourceId($this->source_id, $sourceReferenceIds); //could be sourceReference Objects instead of ids
        foreach($sourceReferences as $sourceReference){
            if(in_array($sourceReference->source_reference, $existingSourceReferences)) $this->updateSourceReferenceBySourceId($sourceReference);
            else $this->insertSourceReference($sourceReference);
        }
    }
    
    private function updateSourceReferenceBySourceId($sourceReference){
        $this->sourceReferenceFactory->updateSourceReferenceBySourceId($sourceReference);
    }
    
    private function insertSourceReference($sourceReference){
        $this->sourceReferenceFactory->saveSourceReference($sourceReference);
    }
    
    /*override this function. Contains logic for getting relevant references from source*/
    protected function getReferencesFromSource($city_id){
        return array();
    }
    
    /*only override if contition for which references should and which shouldn't be handled differs*/
    protected function convertReferences($references){
        $sourceReferences = array();
        foreach($references as $reference){
            $sourceReferences[] = $this->convertReference($reference);
        }
        return $sourceReferences;
    }
    
    /*override this function. Contains logic for converting single reference to sourceReference*/
    protected function convertReference($reference){
        return $this->toObject($reference);
    }
    
    /*override this function to do some final manipulation*/
    protected function postRelevantReferencesHandler(&$references, &$sourceReferences) {
        
    }
 
    
    
    /**
     * METRICS
     */
    
    
    /*entry point */
    public function getMetricsBySourceReferencePoiIdRange($from, $batchSize){
       if(is_null($from)) $from = 0;
       $sourceReferencePoiIds = $this->sourceReferencePoiFactory->getSourceReferencePoiIdsBySourceIdBatch($from, $batchSize, $this->source_id);
       foreach($sourceReferencePoiIds as $sourceReferencePoiId){
           $this->getMetricsBySourceReferencePoiId($sourceReferencePoiId['source_reference_poi_id']);
       }
    }
    
    /*entry point */
    public function getMetricsBySourceReferencePoiId($sourceReferencePoiId){
        $metrics  = $this->sourceReferencePoiMetricFactory->getSourceReferencePoiMetricSourceMetricBySourceReferencePoiId($sourceReferencePoiId);
        $poiStats = $this->extractPoiStatsFromMetrics($metrics);
        $this->insertPoiStats($poiStats);
    }
    
    
    //override this function for specific source Logic
    protected function extractPoiStatsFromMetrics($metrics){
            return;
    }
  
    private function insertPoiStats($poiStats){
        foreach($poiStats as $poiStat){
            $this->insertPoiStat($poiStat);
            $this->sourceReferencePoiMetricFactory->updateSourceReferencePoiMetricLastFetched($poiStat);
        }
    }
    
    private function insertPoiStat($poiStat){
        $this->poiStatFactory->insertPoiStat($poiStat);
    }
    
    /*entry point*/
    public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize){
        $sourceReferencePois = $this->sourceReferencePoiFactory->getSourceReferencePoiIdsBySourceIdBatch($from, $batchSize, $this->source_id);
        // var_dump('test: ', $sourceReferencePois);
        $this->getAdditionalDataBySourceReferences($sourceReferencePois);
        //$this->saveAdditionalDatas($additionalDatas);
    }
    
    /*entry point -> you allready provide the right objects from a given source*/
    public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId){
        //keep in mind that the provided id needs to be of the right source
        $sourceReferencePoi = $this->sourceReferencePoiFactory->getSourceReferencePoiById($sourceReferencePoiId);
        $additionalData  = $this->getAdditionalDataBySourceReference($this->sourceReferenceFactory->getSourceReferenceById($sourceReferencePoi->source_reference_id));
        // var_dump('additional data: ', $additionalData);
        $this->saveAdditionalData($additionalData, $this->sourceReferenceFactory->getSourceReferenceById($sourceReferencePoi->source_reference_id));
    }
    
    private function getAdditionalDataBySourceReferences($sourceReferencePois){
        $additionalData = Array();
        foreach($sourceReferencePois as $sourceReferencePoi){
            $additionalData[] = $this->getAdditionalDataBySourceReferencePoiId($sourceReferencePoi['source_reference_poi_id']);
        }
        return $additionalData;
    }
     
    /*override function for specific source logic*/
    protected function getAdditionalDataBySourceReference($sourceReference){
        return array();
    }
    
    /*override for specific source logic*/
    protected function saveAdditionalData($additionalData, $sourceReference){
        return array();
    }
}

?>
