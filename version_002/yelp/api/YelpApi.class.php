<?php
    namespace yelp\api;
    require_once ('OAuth.php');
    class YelpApi {
        private $app_id = 'lV-UrjAZ9WptP1Ouw4mXlA';
        private $app_secret = 'aCbqMPgmkRTUmXyyXabALiEHXwiDkiwUlvaCx7SeeyC49ey8RafBQNLnbJLKPVqX';
        private $yelp;

        public function __construct(){        
            $this->yelp = new \Yelp($this->app_id, $this->app_secret);
        }

        public function searchCoordinate($latitude, $longitude, $radius_filter, $limit){
            $params = array(    "latitude" => $latitude,
                                "longitude" => $longitude,
                                "radius" => $radius_filter,
                                "limit" => $limit);
            
            return $this->yelp->get('businesses/search', $params);
        }

        public function getBusiness($business_id){
            return $this->yelp->get('businesses/'. $business_id);
        }
    }
?>
