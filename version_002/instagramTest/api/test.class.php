<?php
	namespace instagramTest\api;
	require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/util/cURL.class.php');

	//https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code

	// code = 20a02daf41d14664ada72f56758a2e00

	// access_token = 4770525872.2b10bf5.a18dbd93307848b683403b4a6d27399a

	$baseUrl = "https://www.instagram.com/";

	$authUrl = "https://www.instagram.com/oauth/authorize/";

	

	// $url = $authUrl . '?client_id=' . $client_id . '&redirect_uri=http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/instagramTest/redirect.php&response_type=code';

	

	// $uri = 'https://api.instagram.com/oauth/access_token';
	$uri = 'https://api.instagram.com/v1/users/search?q=jarmovd&access_token=4770525872.2b10bf5.a18dbd93307848b683403b4a6d27399a';
	$data = [
		'client_id' => '2b10bf5082be4bd99c42108e7a95c574', 
		'client_secret' => '75ec437793f3410380e5a2aa4d09d7f4', 
		'grant_type' => 'authorization_code', 
		'redirect_uri' => 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/instagramTest/redirect.php', 
		'code' => '9e934f612de24ca8bf42909434482509'
	];
	// $ch = curl_init();
	// curl_setopt($ch, CURLOPT_URL, $uri); // uri
	// curl_setopt($ch, CURLOPT_POST, true); // POST
	// curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // POST DATA
	// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // RETURN RESULT true
	// curl_setopt($ch, CURLOPT_HEADER, 0); // RETURN HEADER false
	// curl_setopt($ch, CURLOPT_NOBODY, 0); // NO RETURN BODY false / we need the body to return
	// curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // VERIFY SSL HOST false
	// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // VERIFY SSL PEER false
	// $result = json_decode(curl_exec($ch)); // execute curl	

	// $response = json_decode(curl_exec($ch));
    // $results = $response->json();

    // var_dump($response);
    // echo $results;

	// exit(print_r($result));

	// $result = json_decode(curl_exec($ch)); // execute curl
	// echo '<pre>'; // preformatted view
	
	// ecit directly the result
	// exit(print_r($result)); 

	/**
	* 
	*/
	class test
	{
		private $code = '492a1a993b064b3ca10c6661b838a9a2';

		protected $apiUrl = 'https://api.instagram.com/v1/';
		protected $authUrl = 'https://api.instagram.com/oauth/authorize/';

		protected $redirectUri = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/instagramTest/redirect.php';

		private $client_secret = '75ec437793f3410380e5a2aa4d09d7f4';
		private $client_id = '2b10bf5082be4bd99c42108e7a95c574';
		private $access_token = '4770525872.2b10bf5.a18dbd93307848b683403b4a6d27399a';

		public function createUrl($baseUrl, $endpoint, $params)
		{
			if (!empty($params) && $params) {
				foreach ($params as $key => $value) {
					$parameters[] = $key . '=' . $value;
				}
				$implodedParams = implode('&', $parameters);
				$url = $baseUrl . $endpoint . '?' . $implodedParams;
			}
			else {
				$url = $baseUrl . $endpoint . '?';
			}
			echo $url;
			return $url;
		}

		public function MakeApiCall($apiUrl)
		{
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiUrl);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$result = json_decode(curl_exec($ch));
			// var_dump($result);
			// $cURL = new \util\cURL($apiUrl);
			// $cURL->setParams(array());
			// $results =  $cURL->Request();
			if (count($result) > 1) {
				return $result->data;
			}
			elseif (count($result) == 1) {
				// var_dump($result);
				return $result->data[0];
			} else {
				return $result->data;
			}
			// return $result->data;
			
		}

		public function getUserByName($userName, $count = 1)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/search', array('access_token'=>$this->access_token, 'q'=>$userName, 'count'=>$count)));
		}

		public function getRecentMediaOfUser($userId, $count = 1)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/' . $userId . '/media/recent', array('access_token'=>$this->access_token, 'count'=>$count)));
		}

		public function getRecentMediaOfSelf($count = 1)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/self/media/recent', array('access_token'=>$this->access_token, 'count'=>$count)));
		}

		public function getSelf()
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/self', array('access_token'=>$this->access_token)));
		}

		public function followedBy()
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/self/followed-by', array('access_token'=>$this->access_token)));
		}

		public function Follows()
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/self/follows', array('access_token'=>$this->access_token)));
		}

		public function getUserById($userId)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'users/' . $userId, array('access_token'=>$this->access_token)));
		}

		public function SearchLocation($latitude, $longitude, $distance = 0, $facebook_places_id = 0)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'locations/search', array('access_token'=>$this->access_token, 'lat'=>$latitude, 'lng'=>$longitude, 'distance'=>$distance, 'facebook_places_id'=>$facebook_places_id)));
		}

		public function getRecentMediaByLocationId($locationId)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'locations/' . $locationId . '/media/recent', array('access_token'=>$this->access_token)));
		}

		public function getLocationById($locationId)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'locations/' . $locationId, array('access_token'=>$this->access_token)));
		}

		public function getTagByName($tagName)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'tags/' . $tagName, array('access_token'=>$this->access_token)));
		}

		public function getRecentMediaByTagName($tagName)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'tags/' . $tagName . '/media/recent', array('access_token'=>$this->access_token)));
		}

		public function getMediaById($mediaId)
		{
			return $this->MakeApiCall($this->createUrl($this->apiUrl, 'media/' . $mediaId, array('access_token'=>$this->access_token)));
		}

		public function authenticate($scope)
		{
			// $url = $this->createUrl('https://api.instagram.com/oauth/access_token', '', array('client_id'=>$this->client_id, 'client_secret'=>$this->client_secret, 'grant_type'=>'authorization_code', 'redirect_uri'=>$this->redirectUri, 'code'=>$this->code));
			// $this->createUrl($this->authUrl, '', array('client_id'=>$this->client_id, 'redirect_uri'=>$this->redirectUri, 'response_type'=>'code', 'scope'=>$scope));
			$uri = 'https://api.instagram.com/oauth/access_token';
			$data = [
				'client_id' => $this->client_id, 
				'client_secret' => $this->client_secret, 
				'grant_type' => 'authorization_code', 
				'redirect_uri' => 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/instagramTest/redirect.php', 
				'code' => $this->code
			];

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $uri); // uri
			curl_setopt($ch, CURLOPT_POST, true); // POST
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // POST DATA
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // RETURN RESULT true
			curl_setopt($ch, CURLOPT_HEADER, 0); // RETURN HEADER false
			curl_setopt($ch, CURLOPT_NOBODY, 0); // NO RETURN BODY false / we need the body to return
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); // VERIFY SSL HOST false
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); // VERIFY SSL PEER false
			$result = json_decode(curl_exec($ch)); // execute curl
			var_dump($result);

			// echo $url;

			// $ch = curl_init();
			// curl_setopt($ch, CURLOPT_URL, $url);
			// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			// curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
			// $result = json_decode(curl_exec($ch));
			// $result = curl_exec($ch);
			// var_dump($result);
		}
				
	}

	// $test = new test();

	// $test->SearchLocation(51.2199605, 4.4007174);
	// $test->getUserById(4770525872);

?>