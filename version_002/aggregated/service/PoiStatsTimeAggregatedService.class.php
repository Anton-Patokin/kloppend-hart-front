<?php

namespace aggregated\service;

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once (ROOT . 'aggregated/factory/PoiStatsTimeAggregatedFactory.class.php');

class PoiStatsTimeAggregatedService{
    
        protected $PoiStatsTimeAggregatedFactory;
    
        public function __construct()
        {
            $this->PoiStatsTimeAggregatedFactory= new \aggregated\factory\PoiStatsTimeAggregatedFactory();
        }

	public function aggregatePoiStatsTimeBySourceReferencePoiMetricId($sourceReferencePoiMetricId) {
            $this->PoiStatsTimeAggregatedFactory->aggregatePoiStatsTimeBySourceReferencePoiMetricId($sourceReferencePoiMetricId);
        }
        
        public function aggregatePoiStatsTimeBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId) {
            $this->PoiStatsTimeAggregatedFactory->aggregatePoiStatsTimeBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId);
        }
        
        public function getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate){
            return $this->PoiStatsTimeAggregatedFactory->getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate);
        }
        
        public function getPositionsByNid($nid, $startDate, $endDate){
            return $this->PoiStatsTimeAggregatedFactory->getPositionsByNid($nid, $startDate, $endDate);
        }
        
        public function getStatsBySourceNameByNidByTimeRange($sourceName, $nid, $startDate, $endDate){
            return $this->PoiStatsTimeAggregatedFactory->getStatsBySourceNameByNidByTimeRange($sourceName, $nid, $startDate, $endDate);
        }
        
        public function aggregateNextPoiStatsTime($batchSize = 1000, $intervals = null, $batchOffset = 0) {
            $this->PoiStatsTimeAggregatedFactory->aggregateNextPoiStatsTime($batchSize, $intervals, $batchOffset);
        }
        
        public function getTrendingList($lat, $lng, $startDate, $endDate, $source){
            return $this->PoiStatsTimeAggregatedFactory->getTrendingList($lat, $lng, $startDate, $endDate, $source);
        }
        
        public function getTopTrendingList($startDate, $endDate, $source){
            return $this->PoiStatsTimeAggregatedFactory->getTopTrendingList($startDate, $endDate, $source);
        }
        
        public function getPlaceTotalMetricsByNid($nid){
            return $this->PoiStatsTimeAggregatedFactory->getPlaceTotalMetricsByNid($nid);
        }
        
        
}
?>
