<?php

namespace dataMining2\factory;

require_once (ROOT . 'yelp/factory/YelpLocationFactory.class.php');
require_once (ROOT . 'yelp/factory/YelpRatingFactory.class.php');
require_once (ROOT . 'yelp/factory/YelpIsClosedFactory.class.php');
require_once (ROOT . 'yelp/factory/YelpHoursFactory.class.php');
require_once (ROOT . 'yelp/factory/YelpPriceFactory.class.php');
require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'poi/factory/PoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferenceFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');

require_once (ROOT . 'source/model/SourceReference.class.php');
require_once (ROOT . 'source/model/SourceReferencePoi.class.php');

class YelpDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $yelpLocationFactory;
    protected $yelpRatingFactory;
    protected $yelpIsClosedFactory;
    protected $yelpHoursFactory;
    protected $yelpPriceFactory;
    protected $poiFactory;
    protected $poiCityFactory;
    protected $sourceReferenceFactory;
    protected $sourceReferencePoiFactory;
    
    protected $source_name = 'yelp';
    protected $sourceCityGeolocationLimit = 15; //limitation of how many points will be run in one call
            
    public function __construct() {
        parent::__construct();
        $this->poiFactory                = new \poi\factory\PoiFactory();
        $this->poiCityFactory            = new \poi\factory\PoiCityFactory();
        $this->sourceReferenceFactory    = new \source\factory\SourceReferenceFactory();
        $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
        $this->yelpLocationFactory = new \yelp\factory\YelpLocationFactory();
        $this->yelpRatingFactory = new \yelp\factory\YelpRatingFactory();
        $this->yelpIsClosedFactory = new \yelp\factory\YelpIsClosedFactory();
        $this->yelpHoursFactory = new \yelp\factory\YelpHoursFactory();
        $this->yelpPriceFactory = new \yelp\factory\YelpPriceFactory();
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
         return $this->yelpLocationFactory->createYelpLocationsByLatLng($geolocation);
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
        $business = $this->yelpLocationFactory->getBusinessBySourceReference($metrics[0]['source_reference']);
        // var_dump($business->review_count);
        $poiStats = Array();
        foreach($metrics as $metric){
            $poiStat = new \poi\model\PoiStat();
            $poiStat->timestamp = date('Y-m-d H:i:s');
            $poiStat->source_reference_poi_metric_id = $metric['source_reference_poi_metric_id'];
            //you need to know the metrics
            if($metric['metric_name'] == 'review_count') $poiStat->number = (isset($business->review_count)) ? $business->review_count : 0;
            $poiStats[] = $poiStat;
        }
        return $poiStats;
    }

    /**
     * Additional data
     */
    //overrided function
    protected function getAdditionalDataBySourceReference($sourceReference) {
       return $this->yelpLocationFactory->getBusinessBySourceReference($sourceReference->source_reference);
    }

    //overrided function
    protected function saveAdditionalData($additionalData, $sourceReference) {
        $this->handleYelpBusiness($additionalData, $sourceReference);
    }

    private function handleYelpBusiness($yelpBusiness, $sourceReference) {
        // if (!empty($yelpBusiness->rating)) {
        //     $this->handleYelpRating($yelpBusiness, $sourceReference);
        // }
        // if (!empty($yelpBusiness->hours)) {
        //     $this->handleYelpHours($yelpBusiness, $sourceReference);
        // }
        // var_dump('handleYelpBusiness', $yelpBusiness);
        if (!empty($yelpBusiness->price)) {
            $this->handleYelpPrice($yelpBusiness, $sourceReference);
        }
        // $this->handleYelpIsClosed($yelpBusiness, $sourceReference);
    }

    private function handleYelpRating($rating, $sourceReference) {
        $rating->source_reference_id = $sourceReference->source_reference_id;
        $rating->business_rating = $rating->rating;
        $this->yelpRatingFactory->saveYelpRating($rating);
    }

    private function handleYelpHours($hours, $sourceReference) {
        $hours->source_reference_id = $sourceReference->source_reference_id;
        // var_dump($hours->hours[0]->open);
        // $hours->business_hours = json_encode($hours->hours[0]->open);
        for ($i=0; $i < 7; $i++) {
            $business_open = false;
            $business_day = $i;
            $business_start;
            $business_end;
            foreach ($hours->hours[0]->open as $hour) {
                if ($hour->day == $i) {
                    $business_open = true;
                    $business_start = $hour->start;
                    $business_end = $hour->end;
                }
            }
            if ($business_open) {
                $hours->business_day = $business_day;
                $hours->business_start = $business_start;
                $hours->business_end = $business_end;
                $hours->business_open = $business_open;
                $this->yelpHoursFactory->saveYelpHours($hours);
            } else {
                $hours->business_day = $business_day;
                $hours->business_start = '0000';
                $hours->business_end = '0000';
                $hours->business_open = $business_open;
                $this->yelpHoursFactory->saveYelpHours($hours);
            }
        }
    }

    private function handleYelpPrice($price, $sourceReference) {
        $price->source_reference_id = $sourceReference->source_reference_id;
        $price->business_price = $price->price;
        $this->yelpPriceFactory->saveYelpPrice($price);
    }

    private function handleYelpIsClosed($isClosed, $sourceReference) {
        $isClosed->source_reference_id = $sourceReference->source_reference_id;
        $isClosed->business_is_closed = $isClosed->is_closed;
        $this->yelpIsClosedFactory->saveYelpIsClosed($isClosed);
    }
}

?>
