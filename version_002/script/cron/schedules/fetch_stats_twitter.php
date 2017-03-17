<?php

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    require_once(ROOT . 'dataMining2/service/TwitterService.class.php');

    $twitterService  = new \dataMining2\service\TwitterService();
    
    $batchSize = 25;
    
    $twitterService->getMetricsBySourceReferencePoiIdRange(0,$batchSize);
?>
