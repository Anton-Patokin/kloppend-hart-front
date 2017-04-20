<?php

namespace dataMining2\factory;

require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'poi/factory/PoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferenceFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');
require_once (ROOT . 'google/places/factory/GoogleLocationFactory.class.php');
require_once (ROOT . 'google/places/factory/GoogleHoursFactory.class.php');

require_once (ROOT . 'source/model/SourceReference.class.php');
require_once (ROOT . 'source/model/SourceReferencePoi.class.php');

class GoogleDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $poiFactory;
    protected $poiCityFactory;
    protected $sourceReferenceFactory;
    protected $sourceReferencePoiFactory;
    protected $googleLocationFactory;
    protected $googleHoursFactory;
    
    protected $source_name = 'google';
    protected $sourceCityGeolocationLimit = 15; //limitation of how many points will be run in one call
            
    public function __construct() {
        parent::__construct();
        $this->poiFactory                = new \poi\factory\PoiFactory();
        $this->poiCityFactory            = new \poi\factory\PoiCityFactory();
        $this->sourceReferenceFactory    = new \source\factory\SourceReferenceFactory();
        $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
        $this->googleLocationFactory = new \google\places\factory\GoogleLocationFactory();
        $this->googleHoursFactory = new \google\places\factory\GoogleHoursFactory();

    } 
    
    protected function getReferencesFromSource($city_id)
    {
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

    protected function getSourceCityGeolocations($limit){
        return $this->sourceCityGeolocationFactory->createSourceCityGeolocationsBySourceId($this->source_id, $limit);
    }

    private function createSourceReferencesByGeolocation($geolocation){
         return $this->googleLocationFactory->createGoogleLocationsByLatLng($geolocation);
    }

    protected function convertReference($reference){
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference = $reference->id;
        $sourceReference->reference_name   = $reference->name;
        $sourceReference->source_id        = $this->source_id;
        $sourceReference->latitude         = $reference->latitude;
        $sourceReference->longitude        = $reference->longitude;
        
        return $sourceReference;
    }

    /**
     * Metrics
     */

    protected function extractPoiStatsFromMetrics($metrics){
        // $business = $this->yelpLocationFactory->getBusinessBySourceReference($metrics[0]['source_reference']);
        // var_dump($business->review_count);
        $poiStats = Array();
        foreach($metrics as $metric){
            $poiStat = new \poi\model\PoiStat();
            $poiStat->timestamp = date('Y-m-d H:i:s');
            $poiStat->source_reference_poi_metric_id = $metric['source_reference_poi_metric_id'];
            //you need to know the metrics

            $poiStats[] = $poiStat;
        }
        return $poiStats;
    }

    /**
     * Additional data
     */
    //overrided function
    protected function getAdditionalDataBySourceReference($sourceReference) {
       return $this->googleLocationFactory->getPlaceBySourceReference($sourceReference->source_reference);
    }

    //overrided function
    protected function saveAdditionalData($additionalData, $sourceReference) {
        $this->handleGooglePlace($additionalData, $sourceReference);
    }

    private function handleGooglePlace($googlePlace, $sourceReference) {
        if (!empty($googlePlace->opening_hours)) {
            $this->handleGoogleHours($googlePlace, $sourceReference);
        }
    }

    // Google place opening days go from 0-6, starting with sunday
    private function handleGoogleHours($opening_hours, $sourceReference) {
        $opening_hours->source_reference_id = $sourceReference->source_reference_id;
        $previous_day = 10;
        $count = 0;
        $days = array();
        foreach ($opening_hours->opening_hours as $key => $hour) {
            if ($previous_day == $hour->open->day) {
                $count = $count + 1;
            } else {
                $count = 0;
            }
            if (!isset($hour->close->time)) {
                for ($i=0; $i < 7; $i++) { 
                    $opening_hours->place_day = $i;
                    $opening_hours->place_start = '0000';
                    $opening_hours->place_end = '0000';
                    $opening_hours->place_open = true;
                    $opening_hours->times_opened = 0;
                    $this->googleHoursFactory->saveGoogleHours($opening_hours);
                }
            } else {
                $opening_hours->place_day = $hour->open->day;
                $opening_hours->place_start = $hour->open->time;
                $opening_hours->place_end = $hour->close->time;
                $opening_hours->place_open = true;
                $opening_hours->times_opened = $count;
                $previous_day = $hour->open->day;
                $days[] = $hour->open->day;
                $this->googleHoursFactory->saveGoogleHours($opening_hours);
            }
                    }
        $days = array_unique($days);
        if (count($days) != 0 & count($days) != 7) {
            for ($i=0; $i < 7; $i++) { 
                if (!in_array($i, $days)) {
                    $opening_hours->place_day = $i;
                    $opening_hours->place_start = '';
                    $opening_hours->place_end = '';
                    $opening_hours->place_open = false;
                    $opening_hours->times_opened = 0;
                    $this->googleHoursFactory->saveGoogleHours($opening_hours);
                }
            }
        }
    }
}

?>
