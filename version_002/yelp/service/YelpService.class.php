<?php

namespace yelp\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'yelp/factory/YelpRatingFactory.class.php');
require_once(ROOT . 'yelp/factory/YelpIsClosedFactory.class.php');
require_once(ROOT . 'yelp/factory/YelpHoursFactory.class.php');
require_once(ROOT . 'yelp/factory/YelpPriceFactory.class.php');

class YelpService{
    
        protected $yelpRatingFactory;
        protected $yelpIsClosedFactory;
        protected $yelpHoursFactory;
        protected $yelpPriceFactory;
    
        public function __construct()
        {
            $this->yelpRatingFactory = new \yelp\factory\YelpRatingFactory();
            $this->yelpIsClosedFactory = new \yelp\factory\YelpIsClosedFactory();
            $this->yelpHoursFactory = new \yelp\factory\YelpHoursFactory();
            $this->yelpPriceFactory = new \yelp\factory\YelpPriceFactory();
        }
	
        public function getYelpRatingByNid($nid){
            return $this->yelpRatingFactory->getYelpRatingByNid($nid);
        }

        public function getYelpIsClosedByNid($nid){
        	return $this->yelpIsClosedFactory->getYelpIsClosedByNid($nid);
        }

        public function getYelpHoursByNid($nid) {
            return $this->yelpHoursFactory->getYelpHoursByNid($nid);
        }

        public function getYelpPriceByNid($nid) {
            return $this->yelpPriceFactory->getYelpPriceByNid($nid);
        }
}
?>
