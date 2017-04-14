<?php

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    require_once(ROOT . 'dataMining2/service/YelpService.class.php');

    $yelpService  = new \dataMining2\service\YelpService();
    
    $batchSize = 25;
    
    $yelpService->getMetricsBySourceReferencePoiIdRange(0,$batchSize);
?>
