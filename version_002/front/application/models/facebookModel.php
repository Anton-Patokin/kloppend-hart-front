<?php
require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once ROOT . '/aggregated/service/PoiStatsTimeAggregatedService.class.php';
class facebookModel {

    protected $PoiStatsTimeAggregatedService;

    public function __construct() {
        $this->PoiStatsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
    }

    public function getFacebookMetricByNameByTimeRange($metric, $startDate, $endDate, $source = 'facebook'){
        return $this->PoiStatsTimeAggregatedService->getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate);
    }

    public function getTrendingList($lat, $lng, $startDate, $endDate, $source="facebook"){
        return $this->PoiStatsTimeAggregatedService->getTrendingList($lat, $lng, $startDate, $endDate, $source);
    }

    public function getTopTrendingList($startDate, $endDate, $source="facebook"){
        return $this->PoiStatsTimeAggregatedService->getTopTrendingList($startDate, $endDate, $source);
    }

}
?>
