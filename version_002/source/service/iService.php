<?php
namespace matching\service;

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

interface iService{
    
	/*match relevant references by city_id*/
	public function matchRelevantReferences($city_id);
        
}
?>
