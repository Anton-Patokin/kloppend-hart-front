<?php

namespace antwerp\grid\service;

require_once ('iService.php');
require_once (ROOT . 'antwerp/grid/factory/GridYelpFactory.class.php');

class YelpGridService implements iService{
    
        protected $yelpGridFactory;
    
        public function __construct()
        {
            $this->yelpGridFactory = new \antwerp\grid\factory\GridYelpFactory();
        }

	public function getSourceCityGeolocations($city_id) {
            $this->yelpGridFactory->getSourceCityGeolocations($city_id);
        }
}
?>