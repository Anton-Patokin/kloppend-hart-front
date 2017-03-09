<?php

    require_once(ROOT . 'dataMining2/service/FoursquareService.class.php');

    $foursquareService  = new \dataMining2\service\FoursquareService();
    
    $batchSize = 150;
    
    $foursquareService->getMetricsBySourceReferencePoiIdRange(0,$batchSize);
?>
