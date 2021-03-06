<?php
require_once(ROOT. 'aggregated/service/PoiStatsTimeAggregatedService.class.php');
class apenModel{
    
    protected $PoiStatsTimeAggregatedService;
    
   public function __construct() {

       $this->PoiStatsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
   }
    
    public function getApenMetricByNameByTimeRange($metric, $startDate, $endDate, $source = 'apen'){
        return $this->PoiStatsTimeAggregatedService->getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate);
    }
    
    public function getTrendingList($lat, $lng, $startDate, $endDate, $source="apen"){
        return $this->PoiStatsTimeAggregatedService->getTrendingList($lat, $lng, $startDate, $endDate, $source);
    }
    
    public function getTopTrendingList($startDate, $endDate, $source="apen"){
        return $this->PoiStatsTimeAggregatedService->getTopTrendingList($startDate, $endDate, $source);
    }
}
?>
