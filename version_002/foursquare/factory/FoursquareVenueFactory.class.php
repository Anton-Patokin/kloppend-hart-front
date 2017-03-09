<?php

namespace foursquare\factory;
require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'foursquare/api/FoursquareAPI.class.php');
require_once(ROOT . 'foursquare/model/FoursquareVenue.class.php');
require_once(ROOT . 'foursquare/model/FoursquareMayor.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareUserFactory.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareTipFactory.class.php');
require_once(ROOT . 'foursquare/factory/FoursquarePhotoFactory.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareMayorFactory.class.php');

/**
 * MAIN FOURSQUARE OBJECT
 */
class FoursquareVenueFactory extends \core\factory\GenericFactory{
    
    protected $api;
    protected $client_key = "XGJXFVEXXVG35XQO4G1LD4TMARVF35BTKBZLLX0K34N5FXBK";
    protected $client_secret = "F3JQAWLKZEFRWG1LX3XAL3H5YZQAAKQC40NN0D1IEYOQWG2J";
    
    protected $tipFactory;
    protected $photoFactory;
    protected $userFactory;
    protected $mayorFactory;
	
    public function __construct(){
        parent::__construct(new \foursquare\model\FoursquareVenue());
        $this->api = new \foursquare\api\FoursquareApi($this->client_key, $this->client_secret);
        
        $this->tipFactory   = new \foursquare\factory\FoursquareTipFactory();
        $this->userFactory  = new \foursquare\factory\FoursquareUserFactory();
        $this->photoFactory = new \foursquare\factory\FoursquarePhotoFactory();
        $this->mayorFactory = new \foursquare\factory\FoursquareMayorFactory();
    }
    
    public function getVenuesByGeoLocation($geoLocation){
        return $this->toArray($this->api->GetPublic('venues/search', array('ll' => $geoLocation->latitude.','.$geoLocation->longitude, 'radius' => $geoLocation->radius, 'limit' => 50, 'intent' => 'browse'))->response->venues);
     }
    
    public function getVenueBySourceReference($sourceReference){
        //check if response has property venue
        $venue = $this->api->GetPublic('venues/'.$sourceReference);
        if(!isset($venue->response->venue)){ //if no venue in response, return an empty venue object
            return new \foursquare\model\FoursquareVenue();
        }else{
            return $this->toObject($venue->response->venue);
        }
    }
    
    protected function customFillProperty($property, $data, &$object) {
         switch($property){
             case 'photos':
                //TO-DO catch if there are no photos
                if(isset($data->photos->groups[1]->items)) return $this->photoFactory->toArray($data->photos->groups[1]->items);
                else  return Array();
                break;
             case 'tips':
                if(isset($data->tips->groups[0]->items)) return $this->tipFactory->toArray($data->tips->groups[0]->items);
                else return Array();
                break;
             case 'mayor':
                if(isset($data->mayor->user)) return $this->mayorFactory->toObject($data->mayor);
                else return NUll;
                break;
             case 'created_at':
                return $data->createdAt;
                break;
             case 'location':
                 return $data->location;
                 break;
             case 'stats':
                 return $data->stats;
                 break;
             case 'likes':
                 return $data->likes;
                 break;
             default: 
               return $object->$property;
         }
    }
}
?>
