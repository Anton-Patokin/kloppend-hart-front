<?php
    require_once(ROOT . 'aggregated/service/PoiStatsTimeAggregatedService.class.php');
    
     $statsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
     
     $aggregationBatchSize = 1000;

     echo 'test';
     
     $statsTimeAggregatedService->aggregateNextPoiStatsTime($aggregationBatchSize);
?>
