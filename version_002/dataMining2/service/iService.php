<?php
namespace dataMining2\service;

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

interface iService{
    
	/*Look for references relevant to given city*/
	public function getRelevantReferences($city_id);
        
        /*get additional data by SourceReferencePoiId of from range of SourceReferencePoiIds*/
        public function getAdditionalDataBySourceReferencePoiIdRange($from, $batchSize);
        
        /*get additional data by SourceReferencePoiId*/
        public function getAdditionalDataBySourceReferencePoiId($sourceReferencePoiId);

	/*get metric data by SourceReferencePoiId or from range of SourceReferencePoiIds*/
        public function getMetricsBySourceReferencePoiIdRange($from, $batchSize);
        
        /*get metric data by SourceReferencePoiId for single SourceReferencePoiId*/
        public function getMetricsBySourceReferencePoiId($sourceReferencePoiId);  
}
?>
