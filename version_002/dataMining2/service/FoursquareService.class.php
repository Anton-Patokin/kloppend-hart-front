<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/FoursquareDataMiningFactory.class.php');

class FoursquareService implements iService{
    
        public function __construct()
        {
            $this->foursquareDataMiningFactory = new \dataMining2\factory\FoursquareDataMiningFactory();
        }

	public function getRelevantReferences($city_id)
	{
            return $this->foursquareDataMiningFactory->getRelevantReferences($city_id);
	}
        
        public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
            return $this->foursquareDataMiningFactory->getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize);
        }
        
        public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId) {
            return $this->foursquareDataMiningFactory->getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);
        }
        
        public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
            return $this->foursquareDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
        
        public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
        {
            return $this->foursquareDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
        }
}
?>