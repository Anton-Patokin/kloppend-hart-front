<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/YelpDataMiningFactory.class.php');

class YelpService implements iService{
	
	public function __construct()
	{
		$this->YelpDataMiningFactory = new \dataMining2\factory\YelpDataMiningFactory();
	}

	public function getRelevantReferences($city_id)
	{
		return $this->YelpDataMiningFactory->getRelevantReferences($city_id);
	}

	public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
		return $this->YelpDataMiningFactory->getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize);
	}

	public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId) {
		return; // $this->instagramDataMiningFactory->getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);
	}

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
		return $this->YelpDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}

	public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
    {
       return; // $this->instagramDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
    }
}
?>