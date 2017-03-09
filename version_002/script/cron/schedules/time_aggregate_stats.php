<?php
    require_once(ROOT . 'aggregated/service/PoiStatsTimeAggregatedService.class.php');
    
     $statsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
     
     $aggregationBatchSize = 4000;
     
     $statsTimeAggregatedService->aggregateNextPoiStatsTime($aggregationBatchSize);
?>
