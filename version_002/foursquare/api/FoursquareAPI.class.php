<?php
namespace foursquare\api;


class FoursquareApiException extends \Exception {}

class FoursquareApi {
	
	/** @var String $BaseUrl The base url for the foursquare API */
	private $BaseUrl = "https://api.foursquare.com/";
	/** @var String $AuthUrl The url for obtaining the auth access code */
	private $AuthUrl = "https://foursquare.com/oauth2/authenticate";
	/** @var String $TokenUrl The url for obtaining an auth token */
	private $TokenUrl = "https://foursquare.com/oauth2/access_token";
        /** @var String $Version YYYYMMDD */
        private $Version = '20160128'; 
        /** @var String $ClientID */
	private $ClientID;
	/** @var String $ClientSecret */
	private $ClientSecret;
        /** @var String $RedirectUri */
        protected $RedirectUri;
	/** @var String $AuthToken */
	private $AuthToken;
	
	/**
	 * Constructor for the API
	 * Prepares the request URL and client api params
	 * @param String $client_id
	 * @param String $client_secret
	 * @param String $version Defaults to v2, appends into the API url
	 */
	public function  __construct($client_id = false,$client_secret = false, $redirect_uri='', $version="v2"){
		$this->BaseUrl = "{$this->BaseUrl}$version/";
		$this->ClientID = $client_id;
		$this->ClientSecret = $client_secret;
		$this->RedirectUri = $redirect_uri;
	}
    
    public function setRedirectUri( $uri ) {
		$this->RedirectUri = $uri;
    }
	
	// Request functions
	
	/** 
	 * GetPublic
	 * Performs a request for a public resource
	 * @param String $endpoint A particular endpoint of the Foursquare API
	 * @param Array $params A set of parameters to be appended to the request, defaults to false (none)
	 */
	public function GetPublic($endpoint,$params=false){
		// Build the endpoint URL
		$url = $this->BaseUrl . trim($endpoint,"/");
		// Append the client details
		$params['client_id'] = $this->ClientID;
		$params['client_secret'] = $this->ClientSecret;
                $params['v'] = $this->Version;
		// Return the result;
		return $this->GET($url,$params);
	}
	
	/** 
	 * GetPrivate
	 * Performs a request for a private resource
	 * @param String $endpoint A particular endpoint of the Foursquare API
	 * @param Array $params A set of parameters to be appended to the request, defaults to false (none)
	 * @param bool $POST whether or not to use a POST request
	 */
	public function GetPrivate($endpoint,$params=false,$POST=false){
		$url = $this->BaseUrl . trim($endpoint,"/");
		$params['oauth_token'] = $this->AuthToken;
		$params['v'] = $this->Version;
                if(!$POST) return $this->GET($url,$params);	
		else return $this->POST($url,$params);
	}
	
	/**
	 * Request
	 * Performs a cUrl request with a url generated by MakeUrl. The useragent of the request is hardcoded
	 * as the Google Chrome Browser agent
	 * @param String $url The base url to query
	 * @param Array $params The parameters to pass to the request
	 */
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
		return json_decode($result);
	}

	/**
	 * GET
	 * Abstraction of the GET request
	 */
	private function GET($url,$params=false){
		return $this->Request($url,$params,HTTP_GET);
	}

	/**
	 * POST
	 * Abstraction of a POST request
	 */
	private function POST($url,$params=false){
		return $this->Request($url,$params,HTTP_POST);
	}

	
	// Helper Functions
	
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
	
	// Access token functions
	
	/**
	 * SetAccessToken
	 * Basic setter function, provides an authentication token to GetPrivate requests
	 * @param String $token A Foursquare user auth_token
	 */
	public function SetAccessToken($token){
		$this->AuthToken = $token;
	}
	
	/**
	 * AuthenticationLink
	 * Returns a link to the Foursquare web authentication page.
	 * @param String $redirect The configured redirect_uri for the provided client credentials
	 */
	public function AuthenticationLink($redirect=''){
        if ( 0 === strlen( $redirect ) ) {
            $redirect = $this->RedirectUri;
        }
		$params = array("client_id"=>$this->ClientID,"response_type"=>"code","redirect_uri"=>$redirect);
		return $this->MakeUrl($this->AuthUrl,$params);
	}
	
	public function GetResponse($url){
		$result = $this->GET($url);
		$json = json_decode($result);
		return $json;
	}
	
	/**
	 * GetToken
	 * Performs a request to Foursquare for a user token, and returns the token, while also storing it
	 * locally for use in private requests
	 * @param $code The 'code' parameter provided by the Foursquare webauth callback redirect
	 * @param $redirect The configured redirect_uri for the provided client credentials
	 */
	public function GetToken($code,$redirect=''){
        if ( 0 === strlen( $redirect ) ) {
            // If we have to use the same URI to request a token as we did for 
            // the authorization link, why are we not storing it internally?
            $redirect = $this->RedirectUri;
        }
		$params = array("client_id"=>$this->ClientID,
						"client_secret"=>$this->ClientSecret,
						"grant_type"=>"authorization_code",
						"redirect_uri"=>$redirect,
						"code"=>$code);
		$result = $this->GET($this->TokenUrl,$params);
		$json = json_decode($result);
		if (property_exists($json, 'access_token')) {
			$this->SetAccessToken($json->access_token);
			return $json->access_token;
		}
		else {
			return 0;
		}
	}
	
}
