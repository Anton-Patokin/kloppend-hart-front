<?php

namespace antwerp\grid\service;

require_once ('iService.php');
require_once (ROOT . 'antwerp/grid/factory/GridInstagramFactory.class.php');

class InstagramGridService implements iService{
    
        protected $instagramGridFactory;
    
        public function __construct()
        {
            $this->instagramGridFactory = new \antwerp\grid\factory\GridInstagramFactory();
        }

	public function getSourceCityGeolocations($city_id) {
            $this->instagramGridFactory->getSourceCityGeolocations($city_id);
        }
}
?>