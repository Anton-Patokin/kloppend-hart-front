<?php

namespace antwerp\grid\service;

require_once ('iService.php');
require_once (ROOT . 'antwerp/grid/factory/GridGoogleFactory.class.php');

class GoogleGridService implements iService{
    
        protected $googleGridFactory;
    
        public function __construct()
        {
            $this->googleGridFactory = new \antwerp\grid\factory\GridGoogleFactory();
        }

	public function getSourceCityGeolocations($city_id) {
            $this->googleGridFactory->getSourceCityGeolocations($city_id);
        }
}
?>