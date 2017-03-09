<?php

    require_once(ROOT . 'dataMining2/service/ApenService.class.php');
    
    $apenService = new \dataMining2\service\ApenService();
    
    $batchSize = 500;
    
    $apenService->getMetricsBySourceReferencePoiIdRange(0,$batchSize);
?>
