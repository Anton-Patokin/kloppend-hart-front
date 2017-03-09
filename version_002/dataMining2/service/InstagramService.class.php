<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/InstagramDataMiningFactory.class.php');

class InstagramService implements iService{
    
        public function __construct()
        {
            $this->instagramDataMiningFactory = new \dataMining2\factory\InstagramDataMiningFactory();
        }

	public function getRelevantReferences($city_id)
	{
            return $this->instagramDataMiningFactory->getRelevantReferences($city_id);
	}
        
        public function getReferencesWithFoursquare($city_id){
            return $this->instagramDataMiningFactory->getReferencesWithFoursquare($city_id);
        }
        
        public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
            return $this->instagramDataMiningFactory->getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize);
        }
        
        public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId) {
            return $this->instagramDataMiningFactory->getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);
        }

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
            return $this->instagramDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
        
        public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
        {
           return $this->instagramDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
        }
}
?>