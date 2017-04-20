<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/GoogleDataMiningFactory.class.php');

class GoogleService implements iService{
	
	public function __construct()
	{
		$this->googleDataMiningFactory = new \dataMining2\factory\GoogleDataMiningFactory();
	}

	public function getRelevantReferences($city_id)
	{
		return $this->googleDataMiningFactory->getRelevantReferences($city_id);
	}

	public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
		return $this->googleDataMiningFactory->getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize);
	}

	public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId) {
		return; // $this->googleDataMiningFactory->getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);
	}

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
		return $this->googleDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}

	public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
    {
       return; // $this->googleDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
    }
}
?>