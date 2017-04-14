<?php
namespace instagram\api;
require_once (ROOT. 'util/cURL.class.php');

class InstagramApi {
    
   protected $client_id = '9753627ab8c8488d9c76e8b68e0a4d18';
   protected $apiURL    = 'https://api.instagram.com/v1/';
   
   public function searchLocationsByLatLng($lat, $lng, $distance = 0){
       $params = array("lat" => $lat, "lng" => $lng);
       return $this->makeApiCall($this->createUrl('locations/search'),false, $params);
   }
   
   public function searchLocationsByFoursquareId($foursquare_v2_id, $foursquare_v1_id = 0){
       if($foursquare_v1_id != 0) $params['foursquare_id'] = $foursquare_v1_id;
       else $params['foursquare_v2_id'] = $foursquare_v2_id;
       return $this->makeApiCall($this->createUrl('locations/search'),false, $params);  
   }
   
   public function getLocationById($locationId){
        return $this->makeApiCall($this->createUrl('locations/'.$locationId));
   }
   
   public function getLocationMediaById($locationId, $minTimestamp = 0, $maxTimestamp = 0, $minId = 0, $maxId = 0) {
       $params = array();
       //looking for a generic way to add optional params to the API-call
       if($minTimestamp != 0) $params['min_timestamp'] = $minTimestamp;
       if($maxTimestamp != 0) $params['max_timestamp'] = $maxTimestamp;
       if($minId != 0) $params['min_id'] = $minId;
       if($maxId != 0) $params['max_id'] = $maxId;
       return $this->makeApiCall($this->createUrl('locations/'.$locationId.'/media/recent'),false, $params);
   }
   
   
   public function getTagByName($tagName){
       return $this->makeApiCall($this->createUrl('tags/'.$tagName));
   }
   
   public function getTagMediaByName($tagName, $minId = 0, $maxId = 0){
       $params = array();
       if($minId != 0) $params['min_id'] = $minId;
       if($maxId != 0) $params['max_id'] = $maxId;
       return $this->makeApiCall($this->createUrl('tags/'.$tagName.'/media/recent'), false, $params);
   }
   
   public function searchTagsByName($tagName){
       $params = array('q' => $tagName);
       return $this->makeApiCall($this->createUrl('tags/search'), false, $params);
   }
   
   public function getUserById($userId){
        return $this->makeApiCall($this->createUrl('users/'.$userId));
   }
   
   public function getPopularMedia(){
       return $this->makeApiCall($this->createUrl('media/popular'));
   }
   
   public function getMediaById($mediaId){
       return $this->makeApiCall($this->createUrl('media/'.$mediaId));
   }
   
   public function searchMediaByLatLng($lat, $lng, $distance = 0, $minTimestamp = 0, $maxTimestamp = 0){
       $params = array("lat" => $lat, "lng" => $lng);
       if($distance != 0) $params['distance'] = $distance;
       if($minTimestamp != 0) $params['min_timestamp'] = $minTimestamp;
       if($maxTimestamp != 0) $params['max_timestamp'] = $maxTimestamp;
       return $this->makeApiCall($this->createUrl('media/search'), false, $params);
   }
   
   private function createUrl($endpoint){
       return $this->apiURL . $endpoint;
   }
   
   private function makeApiCall($url, $auth = false, $params = array()){
       if(!$auth) $params['client_id'] = $this->client_id;
       $cURL = new \util\cURL($url);
       $cURL->setParams($params);
       $results =  $cURL->Request();
       if(count(json_decode($results)->data) > 1){
           return json_decode($results)->data;
       }elseif(count(json_decode($results)->data) == 1){
           return json_decode($results)->data[0];
       }else{
           return json_decode($results)->data;
       }
   }
   
    
}
?>
