<?php

namespace antwerp\grid\service;

require_once ('iService.php');
require_once (ROOT . 'antwerp/grid/factory/GridFacebookFactory.class.php');

class FacebookGridService implements iService{
    
        protected $facebookGridFactory;
    
        public function __construct()
        {
            $this->facebookGridFactory= new \antwerp\grid\factory\GridFacebookFactory();
        }

	public function getSourceCityGeolocations($city_id) {
            $this->facebookGridFactory->getSourceCityGeolocations($city_id);
        }
}
?>