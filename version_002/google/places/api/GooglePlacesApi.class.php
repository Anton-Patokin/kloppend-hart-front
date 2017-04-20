<?php
	namespace google\places\api;
	/**
	* 
	*/
	class GooglePlacesApi
	{

		private $api_key = 'AIzaSyCKIVuj1s3lgJBpWlVKpG395YEqLVZSQAY';
		public $places_api = 'https://maps.googleapis.com/maps/api/place/';
		
		public function createUrl($baseUrl, $endpoint, $params)
		{
			if (!empty($params) && $params) {
				foreach ($params as $key => $value) {
					$parameters[] = $key . '=' . $value;
				}
				$implodedParams = implode('&', $parameters);
				$url = $baseUrl . $endpoint . '?key=' . $this->api_key . '&' . $implodedParams;
			}
			else {
				$url = $baseUrl . $endpoint . '?';
			}
			return $url;
		}

		public function MakeApiCall($apiUrl)
		{
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiUrl);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($ch);
			curl_close($ch);
			return json_decode($result);			
		}

		public function getNearbyPlaces($longitude, $latitude, $radius=300){
			return $this->MakeApiCall($this->createUrl($this->places_api, 'nearbysearch/json', array('location'=>$longitude.','.$latitude, 'radius'=>$radius, 'type'=>'point_of_interest')));
		}

		public function getPlaceDetails($placeId){
			return $this->MakeApiCall($this->createUrl($this->places_api, 'details/json', array('placeid'=>$placeId)));
		}

		public function test(){
			// URL to make:
			// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDGIuMorkZ4YCrfHNBKfcxfsetv-C0a9Os&location=51.2331400,4.4050900&radius=500&type=point_of_interest
			
		}

	}

?>