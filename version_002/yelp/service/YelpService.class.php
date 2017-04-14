<?php

namespace yelp\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'yelp/factory/YelpRatingFactory.class.php');
require_once(ROOT . 'yelp/factory/YelpIsClosedFactory.class.php');

class YelpService{
    
        protected $yelpRatingFactory;
        protected $yelpIsClosedFactory;

    
        public function __construct()
        {
            $this->yelpRatingFactory = new \yelp\factory\YelpRatingFactory();
            $this->yelpIsClosedFactory = new \yelp\factory\YelpIsClosedFactory();
        }
	
        public function getYelpRatingByNid($nid){
            return $this->yelpRatingFactory->getYelpRatingByNid($nid);
        }

        public function getYelpIsClosedByNid($nid){
        	return $this->yelpIsClosedFactory->getYelpIsClosedByNid($nid);
        }
}
?>
