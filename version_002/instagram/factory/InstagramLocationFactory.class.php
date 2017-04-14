<?php

	namespace instagram\factory;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'instagram/model/InstagramLocation.class.php');
	require_once(ROOT . 'instagram/api/instagramApi.class.php');
	require_once(ROOT . 'core/factory/GenericFactory.class.php');

	/**
	* 
	*/
	class InstagramLocationFactory extends \core\factory\GenericFactory
	{
		
		function __construct()
		{
			parent::__construct(new \instagram\model\InstagramLocation());
			$this->api = new \instagram\api\instagramApi();
		}

		public function createInstagramLocationsByLatLng($geoLocation)
		{
			return $this->toArray($this->api->searchLocation($geoLocation->latitude, $geoLocation->longitude, $geoLocation->radius));
		}

		public function test()
		{
			// $geoLocation = new stdClass();
			// $geoLocation->latitude = 51.2003200;
			// $geoLocation->longitude = 4.4391900;
			// $geoLocation->latitude = 50;
			// $geoLocation = (object)['latitude'=>51.2152904, 'longitude'=>4.4080673, 'radius'=>0];
			// var_dump($geoLocation);
			// $this->createInstagramLocationsByLatLng($geoLocation);
		}
	}

?>