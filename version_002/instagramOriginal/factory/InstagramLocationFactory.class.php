<?php

namespace instagram\factory;

require_once(ROOT . 'instagram/model/InstagramLocation.class.php');
require_once(ROOT . 'instagram/api/InstagramApi.class.php');

class InstagramLocationFactory extends \core\factory\GenericFactory{
    
    protected $api;
    
    public function __construct(){
        parent::__construct(new \instagram\model\InstagramLocation());
        $this->api = new \instagram\api\InstagramApi();
    }
    
    
    //create Instagram Locations By Geolocation
    public function createInstagramLocationsByLatLng($geoLocation){
        return $this->toArray($this->api->searchLocationsByLatLng($geoLocation->latitude, $geoLocation->longitude, $geoLocation->radius));
    }
        
    //create Instagram Location Models by foursquare Ids
    public function createInstagramLocationByFoursquareId($foursquareId){
      return $this->toObject($this->api->searchLocationsByFoursquareId($foursquareId));
    }
       
}
?>
