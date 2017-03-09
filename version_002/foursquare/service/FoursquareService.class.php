<?php

namespace foursquare\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'foursquare/factory/FoursquareTipFactory.class.php');
require_once(ROOT . 'foursquare/factory/FoursquarePhotoFactory.class.php');

class FoursquareService{
    
        protected $foursquareTipFactory;
        protected $foursquarePhotoFactory;
    
        public function __construct()
        {
            $this->foursquareTipFactory = new \foursquare\factory\FoursquareTipFactory();
            $this->foursquarePhotoFactory = new \foursquare\factory\FoursquarePhotoFactory();
        }
	
        public function getFoursquareTipsByNid($nid){
            return $this->foursquareTipFactory->createFoursquareTipsByNid($nid);
        }
        
        public function getFoursquarePhotosByNid($nid){
            return $this->foursquarePhotoFactory->getFoursquarePhotosByNid($nid);
        }
}
?>
