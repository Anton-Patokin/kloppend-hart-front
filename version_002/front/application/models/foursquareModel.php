<?php
require_once(ROOT. '/aggregated/service/PoiStatsTimeAggregatedService.class.php');
class foursquareModel{
    
    protected $PoiStatsTimeAggregatedService;
    
   public function __construct() {
       $this->PoiStatsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
   }
    
    public function getFoursquareMetricByNameByTimeRange($metric, $startDate, $endDate, $source = 'foursquare'){
        return $this->PoiStatsTimeAggregatedService->getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate);
    }
    
    public function getTrendingList($lat, $lng, $startDate, $endDate, $source = 'foursquare'){
       return $this->PoiStatsTimeAggregatedService->getTrendingList($lat, $lng, $startDate, $endDate, $source);
    }
    
    public function getTopTrendingList($startDate, $endDate, $source="foursquare"){
        return $this->PoiStatsTimeAggregatedService->getTopTrendingList($startDate, $endDate, $source);
    }
    
}
?>