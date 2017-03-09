<?php

namespace poi\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'poi/factory/PoiFactory.class.php');

class PoiService{
    
        protected $poiFactory;
    
        public function __construct()
        {
            $this->poiFactory = new \poi\factory\PoiFactory();
        }
        
        public function getNearbyPlacesByNid($nid){
           return $this->poiFactory->getNearbyPoisByNid($nid);
        }
        
        public function getTopPlacesByCategory($category, $subcategory, $startDate, $endDate){
            return $this->poiFactory->getTopPlacesByCategory($category, $subcategory, $startDate, $endDate);
        }
        
        public function getSearchResults($value){
            return $this->poiFactory->getSearchResults($value);
        }
	
}
?>
