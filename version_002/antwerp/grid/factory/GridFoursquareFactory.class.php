<?php
namespace antwerp\grid\factory;

require_once(ROOT . 'antwerp/grid/factory/GridFactory.class.php');

class GridFoursquareFactory extends \antwerp\grid\factory\GridFactory{
    
    protected $source_name = 'foursquare';
    protected $gridDivide  = 200; //in meters
    
    public function __construct(){
        parent::__construct();
    }
    
    public function getSourceCityGeolocations($city_id) {
        return parent::getSourceCityGeolocations($city_id);
    } 
}


?>