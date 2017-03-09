<?php
namespace dataMining2\factory;

require_once (ROOT . 'foursquare/factory/FoursquareVenueFactory.class.php');
require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'foursquare/factory/FoursquarePhotoFactory.class.php');
require_once (ROOT . 'foursquare/factory/FoursquareUserFactory.class.php');
require_once (ROOT . 'foursquare/factory/FoursquareTipFactory.class.php');
require_once (ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');

class FoursquareDataMiningFactory extends \dataMining2\factory\DataMiningFactory{
    protected $source_name = 'foursquare';
    protected $venueFactory;
    protected $photoFactory;
    protected $userFactory;
    protected $tipFactory;
    protected $mayorFactory;
    
    protected $sourceCityGeolocationLimit = 10;
    
    public function __construct(){
        parent::__construct();
        $this->venueFactory = new \foursquare\factory\FoursquareVenueFactory();
        $this->photoFactory = new \foursquare\factory\FoursquarePhotoFactory();
        $this->userFactory  = new \foursquare\factory\FoursquareUserFactory();
        $this->tipFactory   = new \foursquare\factory\FoursquareTipFactory();
        $this->mayorFactory = new \foursquare\factory\FoursquareMayorFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
    }
    
    //specific function to get all relevant references
    protected function getReferencesFromSource($city_id) {
        
        $sourceCityGeolocations = $this->getSourceCityGeolocations($city_id, $this->sourceCityGeolocationLimit);
        $references = array();
        foreach($sourceCityGeolocations as $sourceCityGeolocation){
            //get references from source
            $references = array_merge($references, $this->getVenuesByGeoLocation($sourceCityGeolocation));
            //update specific point with timestamp
            $sourceCityGeolocation->last_fetched = date('Y-m-d H:i:s');
            $this->sourceCityGeolocationFactory->saveSourceCityGeolocation($sourceCityGeolocation);
        }
        

        return $references;
    }
    
     protected function convertReference($reference) {
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference = $reference->id;
        $sourceReference->reference_name   = $reference->name;
        $sourceReference->source_id        = $this->source_id;
        $sourceReference->latitude         = $reference->location->lat;
        $sourceReference->longitude        = $reference->location->lng;
        $sourceReference->address          = (isset($reference->location->address)) ? $reference->location->address : null;
        return $sourceReference;
    }
    
    private function getVenuesByGeoLocation($geoLocation){
        return $this->venueFactory->getVenuesByGeoLocation($geoLocation);
    }
    
    protected function getSourceCityGeolocations($limit){
        return $this->sourceCityGeolocationFactory->createSourceCityGeolocationsBySourceId($this->source_id, $limit);
    }
    
    
    /**
     * METRICS
     */
    
    /*overrided function -> allways return poiStat Object */
    protected function extractPoiStatsFromMetrics($metrics) {
        
        //only 1 api call for all metrics
        $venue = $this->venueFactory->getVenueBySourceReference($metrics[0]['source_reference']);
        
        $poiStats = Array();
        foreach($metrics as $metric){
            $poiStat = new \poi\model\PoiStat();
            $poiStat->timestamp = date('Y-m-d H:i:s');
            $poiStat->source_reference_poi_metric_id = $metric['source_reference_poi_metric_id'];
            //you need to know the metrics
            if($metric['metric_name'] == 'checkin') $poiStat->number = (isset($venue->stats->checkinsCount)) ? $venue->stats->checkinsCount : 0;
            if($metric['metric_name'] == 'user')    $poiStat->number = (isset($venue->stats->usersCount)) ? $venue->stats->usersCount : 0;
            if($metric['metric_name'] == 'tip')     $poiStat->number = (isset($venue->stats->tipCount)) ? $venue->stats->tipCount : 0;
            $poiStats[] = $poiStat;
        }
        return $poiStats;
    }
    
    
    
    
    /**
     * Additional DATA
     */
    
     //overrided function
    protected function getAdditionalDataBySourceReference($sourceReference) {
       return $this->venueFactory->getVenueBySourceReference($sourceReference->source_reference);
    }
    
    //overrided function
    protected function saveAdditionalData($additionalData, $sourceReference) {
       $this->handleFoursquareVenue($additionalData, $sourceReference);
    }
    
   
    private function handleFoursquareVenue($foursquareVenue, $sourceReference){
           if(!empty($foursquareVenue->photos))
             $this->handleFoursquarePhotos($foursquareVenue->photos, $sourceReference);
           if(!empty($foursquareVenue->tips))
             $this->handleFoursquareTips($foursquareVenue->tips, $sourceReference);
           if($foursquareVenue->mayor != null) //if NULL -> no mayor for this  place
             $this->handleFoursquareMayor($foursquareVenue->mayor, $sourceReference);
    }
    
    private function handleFoursquareMayor($mayor, $sourceReference){
        $this->handleFoursquareUser($mayor->user);
        $mayor->source_reference_id = $sourceReference->source_reference_id;
        $mayor->foursquare_user_id  = $mayor->user->foursquare_user_id;
        $this->mayorFactory->saveFoursquareMayor($mayor);
    }
    
    //save photos from foursquare
    private function handleFoursquarePhotos($photos, $sourceReference){
        foreach($photos as $foursquarePhoto){
            //save foursquare user
            $this->handleFoursquareUser($foursquarePhoto->user);
            $foursquarePhoto->source_reference_id = $sourceReference->source_reference_id;
            $foursquarePhoto->foursquare_user_id  = $foursquarePhoto->user->foursquare_user_id;
            $this->photoFactory->saveFoursquarePhoto($foursquarePhoto);
        }
    }
    
    //save tips from foursquare
    private function handleFoursquareTips($tips, $sourceReferencePoi){
        foreach($tips as $foursquareTip){
            //save foursquare user
            $this->handleFoursquareUser($foursquareTip->user);
            $foursquareTip->source_reference_id = $sourceReferencePoi->source_reference_id;
            $foursquareTip->foursquare_user_id  = $foursquareTip->user->foursquare_user_id;
            $this->tipFactory->saveFoursquareTip($foursquareTip);
        }
    }
    
    private function handleFoursquareUser($foursquareUser){
       $this->userFactory->saveFoursquareUser($foursquareUser);
    }
    
    
    
    
   
}
?>
