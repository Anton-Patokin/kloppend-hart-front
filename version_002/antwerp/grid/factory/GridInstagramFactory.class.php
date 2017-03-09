<?php
namespace antwerp\grid\factory;

require_once(ROOT . 'antwerp/grid/factory/GridFactory.class.php');

class GridInstagramFactory extends \antwerp\grid\factory\GridFactory{
    
    protected $source_name = 'instagram';
    protected $gridDivide  = 400; //in meters
    
    public function __construct(){
        parent::__construct();
    }
    
    public function getSourceCityGeolocations($city_id) {
        return parent::getSourceCityGeolocations($city_id);
    } 
}


?>