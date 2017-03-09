<?php

namespace dataMining2\factory;

require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'instagram/factory/InstagramMediaFactory.class.php');
require_once (ROOT . 'instagram/factory/InstagramLocationFactory.class.php');
require_once (ROOT . 'instagram/factory/InstagramUserFactory.class.php');
require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'poi/factory/PoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferenceFactory.class.php');
require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once (ROOT . 'source/factory/SourceCityGeolocationFactory.class.php');

require_once (ROOT . 'source/model/SourceReference.class.php');
require_once (ROOT . 'source/model/SourceReferencePoi.class.php');

class InstagramDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $instagramMediaFactory;
    protected $instagramLocationFactory;
    protected $instagramUserFactory;
    protected $poiFactory;
    protected $poiCityFactory;
    protected $sourceReferenceFactory;
    protected $sourceReferencePoiFactory;
    
    protected $source_name = 'instagram';
    protected $sourceCityGeolocationLimit = 15; //limitation of how many points will be run in one call
            
    public function __construct() {
        parent::__construct();
        $this->instagramLocationFactory  = new \instagram\factory\InstagramLocationFactory();
        $this->instagramMediaFactory     = new \instagram\factory\InstagramMediaFactory();
        $this->instagramUserFactory     = new \instagram\factory\InstagramUserFactory();
        $this->poiFactory                = new \poi\factory\PoiFactory();
        $this->poiCityFactory            = new \poi\factory\PoiCityFactory();
        $this->sourceReferenceFactory    = new \source\factory\SourceReferenceFactory();
        $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        $this->sourceCityGeolocationFactory = new \source\factory\SourceCityGeolocationFactory();
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
    
    //overrided function to convert api to sourceReference Object
    protected function convertReference($reference){
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference = $reference->id;
        $sourceReference->reference_name   = $reference->name;
        $sourceReference->source_id        = $this->source_id;
        $sourceReference->latitude         = $reference->latitude;
        $sourceReference->longitude        = $reference->longitude;
        
        return $sourceReference;
    }
    
    protected function getSourceCityGeolocations($limit){
        return $this->sourceCityGeolocationFactory->createSourceCityGeolocationsBySourceId($this->source_id, $limit);
    }
    
    //use instagram API to match with foursquare venues
    public function getReferencesWithFoursquare($city_id){
        $sourceReferences = $this->sourceReferenceFactory->createLinkedSourceReferencesBySourceId($this->sourceFactory->createSourceByName('foursquare')->source_id);
        $i = 0;
        foreach($sourceReferences as $sourceReference){
            $reference = $this->createSourceReferenceByFoursquareId($sourceReference->source_reference);
            //check if instagram returned a match
            if($reference->id !== null)
                $this->saveSourceReferenceWithFoursquare($reference, $sourceReference);
            
            if($i == 10)
                break;
            
            $i++;
        }
    }
    
   private function saveSourceReferenceWithFoursquare($reference, $sourceReference){
        //get poi by original foursquare sourceReference
        $poi = $this->poiFactory->createPoiBySourceReference($sourceReference);
        
        //save instagram source_reference
        $instaSourceReference = new \source\model\SourceReference();
        $instaSourceReference->source_id = $this->source_id;
        $instaSourceReference->source_reference = $reference->id;
        $instaSourceReference->reference_name = $reference->name;
        $source_reference_id = $this->sourceReferenceFactory->saveSourceReference($instaSourceReference);
        
        if($source_reference_id !== NULL){
            //create new sourceReferencePoi Object, if a source_reference has been inserted
            $sourceReferencePoi = new \source\model\SourceReferencePoi();
            $sourceReferencePoi->poi_id = $poi->poi_id;
            $sourceReferencePoi->source_reference_id = $source_reference_id;
            $this->sourceReferencePoiFactory->saveSourceReferencePoi($sourceReferencePoi);
        }
    }
    
    private function createSourceReferenceByFoursquareId($foursquareId){
        return $this->instagramLocationFactory->createInstagramLocationByFoursquareId($foursquareId);
    }
    
    //call to InstagramLocation Factory 
    private function createSourceReferencesByGeolocation($geolocation){
         return $this->instagramLocationFactory->createInstagramLocationsByLatLng($geolocation);
    }
    
    
    
    /**
     * METRICS
     */
    
    /*overrided function -> allways return poiStat Object */
    protected function getPoiStat($sourceReferencePoiMetric, $metric, $sourceReference) {
        $location = $this->instagramMediaFactory->createInstagramMediaByLocationId($sourceReference->source_reference);
        var_dump($location);
        $poiStat = new \poi\model\PoiStat();
        $poiStat->source_reference_poi_metric_id = $sourceReferencePoiMetric->source_reference_poi_metric_id;
        $poiStat->timestamp = date('Y-m-d H:i:s');
        
        //you need to know the metrics
        //define instagram metrics here -> photo, likes, ...
        
        
        return $poiStat;
    }
    
    
    
    /*
     * ADDITIONAL DATA
     */
    
     protected function getAdditionalDataBySourceReference($sourceReference) {
       return $this->instagramMediaFactory->createInstagramMediaByLocationId($sourceReference->source_reference);
    }
    
    protected function saveAdditionalData($additionalData, $sourceReference) {
        if($additionalData !== null)
            $this->handleInstagramMedia($additionalData, $sourceReference);
    }
    
    private function handleInstagramMedia($instagramMedia, $sourceReference){
        foreach($instagramMedia as $instagramMedium){
           $this->handleInstagramUser($instagramMedium->user);
           $instagramMedium->source_reference_id = $sourceReference->source_reference_id;
           $instagramMedium->instagram_user_id   = $instagramMedium->user->instagram_user_id;
           $this->instagramMediaFactory->saveInstagramMedia($instagramMedium);
        }
    }
    
    private function handleInstagramUser($instagramUser){
        $this->instagramUserFactory->saveInstagramUser($instagramUser);
    }
    
    
    
    
    
}

?>
