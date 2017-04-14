<?php
namespace antwerp\grid\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'source/model/SourceCityGeolocation.class.php');
require_once(ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');
require_once(ROOT . 'source/factory/SourceFactory.class.php');
require_once(ROOT . 'antwerp/grid/libs/gps_class.php');

class GridFactory extends \core\factory\GenericFactory{
    
    protected $source_name;
    protected $source_id;
    protected $gridDivide;
    
    protected $horizontalDifference;
    protected $verticalDifference;
    
    protected $sourceFactory;
    protected $sourceCityGeolocationFactory;
    
    protected $antwerpGridBoundaries = array(
                'topRight'   => array('lat' => 51.259337, 'lng' => 4.460423),
                'topLeft'    => array('lat' => 51.259337, 'lng' => 4.343522),
                'bottomLeft' => array('lat' => 51.185154, 'lng' => 4.343522),
                'bottomRight'=> array('lat' => 51.185154, 'lng' => 4.460423)
        
    );
    
    public function __construct(){
        parent::__construct(new \source\model\SourceCityGeolocation());
        $this->sourceFactory = new \source\factory\SourceFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
        $this->source_id = $this->sourceFactory->createSourceByName($this->source_name)->source_id;
        $this->horizontalDifference = $this->antwerpGridBoundaries['topRight']['lng'] -  $this->antwerpGridBoundaries['topLeft']['lng'];
        $this->verticalDifference   = $this->antwerpGridBoundaries['topRight']['lat'] -  $this->antwerpGridBoundaries['bottomRight']['lat'];
    }
    
    public function getSourceCityGeolocations($city_id){
        var_dump('GridFactory');
       //calculate how big each step of the grid has to be
       $steps = $this->calculateSteps();
       //generate the points with the aquired steps
       $sourceCityGeolocations = $this->generateSourceCityGeolocations($steps, $city_id);
       foreach($sourceCityGeolocations as $sourceCityGeolocation){
           $this->sourceCityGeolocationFactory->saveSourceCityGeolocation($sourceCityGeolocation);
       }
    }
    
    private function calculateMeters($lat1, $lng1, $lat2, $lng2){
        return new \antwerp\grid\libs\calcMiles($lat1, $lng1, $lat2, $lng2, 'meter');
    }
    
    private function calculateSteps(){
        
        //calculate distance in meters between the 2 axes of the grid
        $horizontalDistance = $this->calculateMeters($this->antwerpGridBoundaries['topRight']['lat'], $this->antwerpGridBoundaries['topRight']['lng'], $this->antwerpGridBoundaries['topLeft']['lat'], $this->antwerpGridBoundaries['topLeft']['lng']);
        $verticalDistance = $this->calculateMeters($this->antwerpGridBoundaries['topRight']['lat'], $this->antwerpGridBoundaries['topRight']['lng'], $this->antwerpGridBoundaries['bottomRight']['lat'], $this->antwerpGridBoundaries['bottomRight']['lng']);
        
        //calculate the amount of horizontal divides for a given divider
        $horizontalDivider = $horizontalDistance->lastResultFormatted / $this->gridDivide;
        $steps['horizontal'] = round($this->horizontalDifference / $horizontalDivider, 6);
        
        //calculate the amount of vertical divides for a given divider
        $verticalDivider = $verticalDistance->lastResultFormatted / $this->gridDivide;
        $steps['vertical'] = round($this->verticalDifference / $verticalDivider, 6);
        
        return $steps;
    }
    
    private function generateSourceCityGeolocations($steps, $city_id){
        $objects = array();
        //starting latitude -> topLeft corner of the grid
        $startLat = $this->antwerpGridBoundaries['topLeft']['lat'];
        //as long as we are not at the bottom of the grid, keep looping
        while($startLat >= $this->antwerpGridBoundaries['bottomLeft']['lat']){
            $startLat = $startLat - $steps['vertical'];
            $startLng = $this->antwerpGridBoundaries['topLeft']['lng'];
            //foreach latitude step -> get every longitude step
            while($startLng <= $this->antwerpGridBoundaries['topRight']['lng']){
                $startLng = $startLng + $steps['horizontal'];
                
                //construct sourceCityGeolocation Object
                $sourceCityGeolocation = new \source\model\SourceCityGeolocation();
                $sourceCityGeolocation->city_id   = $city_id;
                $sourceCityGeolocation->latitude  = $startLat;
                $sourceCityGeolocation->longitude = $startLng;
                $sourceCityGeolocation->radius    = $this->gridDivide;
                $sourceCityGeolocation->source_id = $this->source_id; 
                
                $objects[] = $sourceCityGeolocation;
            }
           
        }
         print 'Het raster bevat ' .count($objects). ' punten';
         return $objects;
    }
    
}


?>
