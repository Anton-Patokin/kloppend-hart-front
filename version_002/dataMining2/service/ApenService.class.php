<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/ApenDataMiningFactory.class.php');

class ApenService implements iService{
    
        protected $apenDataMiningFactory;
    
        public function __construct()
        {
            $this->apenDataMiningFactory = new \dataMining2\factory\ApenDataMiningFactory();
        }

	public function getRelevantReferences($city_id)
	{
            return $this->apenDataMiningFactory->getRelevantReferences($city_id);
	}
        
        public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
            return;
        }
        
        public function getAdditionalDataBySourceReferencePoiId($sourceReferenceId) {
            return;
        }

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
            return $this->apenDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
        
         public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
         {
             return $this->apenDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
         }
}
?>
