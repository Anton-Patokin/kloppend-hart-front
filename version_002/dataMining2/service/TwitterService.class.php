<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/TwitterDataMiningFactory.class.php');

class TwitterService implements iService{
    
        public function __construct()
        {
            $this->twitterDataMiningFactory = new \dataMining2\factory\TwitterDataMiningFactory();
        }

	public function getRelevantReferences($city_id)
	{
            return $this->twitterDataMiningFactory->getRelevantReferences($city_id);
	}
        
        public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
            return;
        }
        
        public function getAdditionalDataBySourceReferencePoiId($sourceReferenceId) {
            return;
        }

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
            // return $this->twitterDataMiningFactory->getMetricsBySourceReferencePoiMetricIdRange($from, $batchSize);
            //return $this->foursquareDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
        return $this->twitterDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
        
         public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
         {
             return $this->twitterDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
         }
}
?>
