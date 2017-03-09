<?php
namespace antwerp\grid\service;

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');

interface iService{
    
	/*Look for references relevant to given city*/
	public function getSourceCityGeolocations($city_id);
}
?>
