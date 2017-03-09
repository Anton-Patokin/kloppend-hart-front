<?php
namespace dataMining2\factory;

require_once (ROOT . 'facebook/factory/FacebookFactory.class.php');
require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');
require_once (ROOT . 'source/model/SourceReference.class.php');

class FacebookDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $source_name = 'facebook';
    protected $facebookFactory;
    
    protected $sourceCityGeolocationLimit = 10;
    
    public function __construct() {
        parent::__construct();
        $this->facebookFactory = new \facebook\factory\FacebookFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
    } 
    
    protected function getReferencesFromSource($city_id)
    {
       //in facebook's case, we get our references by geolocation
       $sourceCityGeolocations = $this->getSourceCityGeolocations($city_id, $this->sourceCityGeolocationLimit);
        $references = array();
        foreach($sourceCityGeolocations as $sourceCityGeolocation){
            //get references from source
            $references = array_merge($references, $this->createSourceReferencesByGeolocation($sourceCityGeolocation));
            //update specific point with timestamp
            $sourceCityGeolocation->last_fetched = date('Y-m-d H:i:s');
            $this->sourceCityGeolocationFactory->saveSourceCityGeolocation($sourceCityGeolocation);
        }
        
        return $references;
    }
    
   /**
    * METRICS
    */

    /*overrided function -> allways return poiStat Object */
    protected function extractPoiStatsFromMetrics($metrics) {
// var_dump($metrics);
        //only 1 API call
        $place = $this->facebookFactory->getFacebookPlaceBySourceReference($metrics[0]['source_reference']);
        
        $poiStats = Array();
        foreach($metrics as $metric){

            $poiStat = new \poi\model\PoiStat();
            $poiStat->source_reference_poi_metric_id = $metric['source_reference_poi_metric_id'];
            $poiStat->timestamp = date('Y-m-d H:i:s');
            
            //you need to know the metrics
            if($metric['metric_name'] == 'checkin') $poiStat->number = (isset($place['checkins'])) ? $place['checkins'] : 0;
            //talking abouts not accurate -> use facebook fql instead: possible solution
            if($metric['metric_name'] == 'talking_about')    $poiStat->number = (isset($place['talking_about_count'])) ? $place['talking_about_count'] : 0;
            if($metric['metric_name'] == 'like')     $poiStat->number = (isset($place['likes'])) ? $place['likes'] : 0;
            $poiStats[] = $poiStat;
        }

        return $poiStats;
    }
    
    protected function convertReference($reference){
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference  = $reference->id;
        $sourceReference->reference_name    = $reference->name;
        $sourceReference->source_id         = $this->source_id;
        $sourceReference->latitude          = $reference->location->latitude;
        $sourceReference->longitude         = $reference->location->longitude;

        return $sourceReference;
    }
    
    protected function getSourceCityGeolocations($limit){
        return $this->sourceCityGeolocationFactory->createSourceCityGeolocationsBySourceId($this->source_id, $limit);
    }
    
    private function createSourceReferencesByGeolocation($geolocation, $limit = 2000){
        return $this->facebookFactory->createPlacesByGeolocation($geolocation, $limit);
    }
    
     protected function getMetricsBySourceReference($sourceReference){
        $metrics = $this->facebookFactory->createMetricsFromReference($sourceReference->source_reference);
        return $metrics;
    }
    
}

?>
