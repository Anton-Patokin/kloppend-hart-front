<?php

namespace yelp\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'yelp/factory/YelpRatingFactory.class.php');

class YelpService{
    
        protected $yelpRatingFactory;

    
        public function __construct()
        {
            $this->yelpRatingFactory = new \yelp\factory\YelpRatingFactory();
        }
	
        public function getYelpRatingByNid($nid){
            return $this->yelpRatingFactory->getYelpRatingByNid($nid);
        }
}
?>
