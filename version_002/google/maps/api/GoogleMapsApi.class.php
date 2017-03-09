<?php
    namespace google\maps\api;
    class GoogleMapsApi extends \Exception {
        /**
	 * GeoLocate
	 * Leverages the google maps api to generate a lat/lng pair for a given address
	 * packaged with FoursquareApi to facilitate locality searches.
	 * Maximum of 2500 request a day.
	 * @param String $addr An address string accepted by the google maps api
	 * @return array(lat, lng) || NULL
	 */
	public function GeoLocate($addr){
		$geoapi = "http://maps.googleapis.com/maps/api/geocode/json";
		$params = array("address"=>$addr,"sensor"=>"false");
		$response = $this->GET($geoapi,$params);
		$json = json_decode($response);
		
		if ($json->status === "ZERO_RESULTS") {			
			return "ZERO";
		} else if($json->status === "INVALID_REQUEST") {
			return "INVALID";
		} else if($json->status === "OVER_QUERY_LIMIT"){
			return "OVER_QUERY";
		} else if($json->status === "REQUEST_DENIED"){
			return "DENIED";
		} else if(empty($json->results)){
			return "EMPTY";
		} else{
			return array($json->results[0]->geometry->location->lat,$json->results[0]->geometry->location->lng);
		}
	}
        private function Request($url,$params=false,$type=HTTP_GET){
		
		// Populate data for the GET request
		if($type == HTTP_GET) $url = $this->MakeUrl($url,$params);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		if ( isset($_SERVER['HTTP_USER_AGENT']) ) {
			curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] );
		}else {
			// Handle the useragent like we are Google Chrome
			curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.');
		}
		curl_setopt($ch , CURLOPT_TIMEOUT, 30);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

		// Populate the data for POST
		if($type == HTTP_POST){
			curl_setopt($ch, CURLOPT_POST, 1); 
			if($params) curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		}

		$result=curl_exec($ch);
		$info=curl_getinfo($ch);
		curl_close($ch);
		return $result;
	}
  
  
  /**
	 * GET
	 * Abstraction of the GET request
	 */
	private function GET($url,$params=false){
		return $this->Request($url,$params,HTTP_GET);
	}
	
	
	/**
	 * MakeUrl
	 * Takes a base url and an array of parameters and sanitizes the data, then creates a complete
	 * url with each parameter as a GET parameter in the URL
	 * @param String $url The base URL to append the query string to (without any query data)
	 * @param Array $params The parameters to pass to the URL
	 */	
	private function MakeUrl($url,$params){
		if(!empty($params) && $params){
			foreach($params as $k=>$v) $kv[] = "$k=$v";
			$url_params = str_replace(" ","+",implode('&',$kv));
			$url = trim($url) . '?' . $url_params;
		}
		return $url;
	}
    }
?>
