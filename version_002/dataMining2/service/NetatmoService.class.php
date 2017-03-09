<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/NetatmoDataMiningFactory.class.php');

class NetatmoService implements iService{
        
        public $netatmoDataMiningFactory;
    
        public function __construct()
        {
            $this->netatmoDataMiningFactory = new \dataMining2\factory\NetatmoDataMiningFactory();
        }

	public function getRelevantReferences($city_id)
	{
            return $this->netatmoDataMiningFactory->getRelevantReferences($city_id);
	}
        
        public function getReferencesWithFoursquare($city_id){
            return $this->netatmoDataMiningFactory->getReferencesWithFoursquare($city_id);
        }
        
        public function getAdditionalDataBySourceReferencePoiIdRange($fromSourceReferencePoiId, $toSourceReferencePoiId) {
            return $this->netatmoDataMiningFactory->getAdditionalDataBySourceReferencePoiIdRange($fromSourceReferencePoiId, $toSourceReferencePoiId);
        }
        
        public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId) {
            return $this->netatmoDataMiningFactory->getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);
        }

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
            return $this->netatmoDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
        
        public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
        {
           return $this->netatmoDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
        }
}
?>