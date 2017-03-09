<?php
    namespace google\maps\factory;
    require_once (ROOT . 'google/maps/api/GoogleMapsApi.class.php');
    class GoogleMapsFactory {
        
        private $api;
        
        public function __construct() {
            $this->api = new \google\maps\api\GoogleMapsApi();
        }
        
        public function createGeolocationFromAddress($address){
            $geolocation = $this->api->GeoLocate($address);
            var_dump($geolocation);
        }
    }
?>
