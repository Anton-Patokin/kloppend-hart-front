<?php

require_once('../../source/service/SourceReferencePoiMatchService.class.php');

$matchingService = new \source\service\SourceReferencePoiMatchService();
    
    if(isset($_POST['action'])){
        
        if($_POST['action'] == 'match'){
            if(is_numeric($_POST['sourceReferenceId']) && is_numeric($_POST['poiId']))
            $matchingService->markAsMatch($_POST['sourceReferenceId'], $_POST['poiId']);
        }
        
        if($_POST['action'] == 'unmatch'){
            if(is_numeric($_POST['sourceReferenceId']) && is_numeric($_POST['poiId']))
            $matchingService->markAsNoMatch($_POST['sourceReferenceId'], $_POST['poiId']);
        }
    }
?>
