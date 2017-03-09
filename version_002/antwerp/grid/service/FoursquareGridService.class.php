<?php

namespace antwerp\grid\service;

require_once ('iService.php');
require_once (ROOT . 'antwerp/grid/factory/GridFoursquareFactory.class.php');

class FoursquareGridService implements iService{
    
        protected $foursquareGridFactory;
    
        public function __construct()
        {
            $this->foursquareGridFactory = new \antwerp\grid\factory\GridFoursquareFactory();
        }

	public function getSourceCityGeolocations($city_id) {
            $this->foursquareGridFactory->getSourceCityGeolocations($city_id);
        }
}
?>