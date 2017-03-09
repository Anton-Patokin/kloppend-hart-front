<?php

error_reporting(0);
// include_once($_SERVER['DOCUMENT_ROOT'] . 'initSettings.php');
include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
error_reporting(E_ALL);

require_once(ROOT. 'poi/service/PoiService.class.php');
require_once(ROOT. 'source/service/SourceReferencePoiService.class.php');

$poiService = new \poi\service\PoiService();
$sourceReferencePoiService = new \source\service\SourceReferencePoiService();

    if(isset($_POST['nid']) && is_numeric($_POST['nid'])){
        $poi = $poiService->getPoiByNid($_POST['nid']);
        echo json_encode($poi);
    }
    
    if(isset($_POST['title'])){
        $poi = $poiService->getPoiByName($_POST['title']);
        echo json_encode($poi);
    }
    
    if(isset($_POST['refByPoiId']) && isset($_POST['source'])){
        
        switch($_POST['source']){
            case 'facebook': $sourceId = 1; break;
            case 'foursquare': $sourceId = 2; break;
            default: $sourceId = 0;
        }
        
        $sourceReferencePois = $sourceReferencePoiService->getSourceReferencePoisByPoiId($_POST['refByPoiId'], $sourceId);
        echo json_encode($sourceReferencePois);
    }
    
    

?>
