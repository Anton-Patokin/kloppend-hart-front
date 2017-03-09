<?php

    require_once(ROOT . 'dataMining2/service/FacebookService.class.php');
    
    $facebookService = new \dataMining2\service\FacebookService();
    
    $batchSize = 150;
    
    $facebookService->getMetricsBySourceReferencePoiIdRange(0,$batchSize);
?>
