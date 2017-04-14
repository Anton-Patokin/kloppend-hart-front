<?php

namespace dataMining2\service;

require_once ('iService.php');
require_once (ROOT . 'dataMining2/factory/FacebookDataMiningFactory.class.php');

class FacebookService implements iService{
	
	public function __construct()
	{
		$this->facebookDataMiningFactory = new \dataMining2\factory\FacebookDataMiningFactory();
	}

	public function getRelevantReferences($city_id)
	{
		return $this->facebookDataMiningFactory->getRelevantReferences($city_id);
	}
		
	public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize) {
		return;
	}
	
	public function getAdditionalDataBySourceReferencePoiId($sourceReferenceId) {
		return;
	}

	public function getMetricsBySourceReferencePoiIdRange($from, $batchSize)
	{
		return $this->facebookDataMiningFactory->getMetricsBySourceReferencePoiIdRange($from, $batchSize);
	}
		
	public function getMetricsBySourceReferencePoiId($sourceReferencePoiId)
	{
		return $this->facebookDataMiningFactory->getMetricsBySourceReferencePoiId($sourceReferencePoiId);
	}
}
?>
