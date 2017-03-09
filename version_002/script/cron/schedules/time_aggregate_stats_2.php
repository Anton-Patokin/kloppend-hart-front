<?php
    require_once(ROOT . 'aggregated/service/PoiStatsTimeAggregatedService.class.php');
    
     $statsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
     
     $aggregationBatchSize = 1000;
     $batchOffset = 2000;
     
     $statsTimeAggregatedService->aggregateNextPoiStatsTime($aggregationBatchSize, $batchOffset);
?>
