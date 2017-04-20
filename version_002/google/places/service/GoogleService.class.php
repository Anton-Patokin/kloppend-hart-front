<?php

namespace google\places\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'google/places/factory/GoogleRatingFactory.class.php');
require_once(ROOT . 'google/places/factory/GoogleHoursFactory.class.php');

class GoogleService{
    
        protected $googleRatingFactory;
        protected $googleHoursFactory;
    
        public function __construct()
        {
            $this->googleRatingFactory = new \google\places\factory\GoogleRatingFactory();
            $this->googleHoursFactory = new \google\places\factory\GoogleHoursFactory();
        }
	
        public function getGoogleRatingByNid($nid){
            return $this->googleRatingFactory->getGoogleRatingByNid($nid);
        }

        public function getGoogleHoursByNid($nid){
        	return $this->googleHoursFactory->getGoogleHoursByNid($nid);
        }
}
?>
