<?php

	namespace google\places\factory;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'google/places/model/GoogleLocation.class.php');
	require_once(ROOT . 'google/places/api/GooglePlacesApi.class.php');
	require_once(ROOT . 'core/factory/GenericFactory.class.php');

	/**
	* 
	*/
	class GoogleLocationFactory extends \core\factory\GenericFactory
	{
		
		function __construct()
		{
			parent::__construct(new \google\places\model\GoogleLocation());
			$this->api = new \google\places\api\GooglePlacesApi();
		}

		public function createGoogleLocationsByLatLng($geoLocation)
		{
			return $this->toArray($this->api->getNearbyPlaces($geoLocation->latitude, $geoLocation->longitude, $geoLocation->radius, 20)->results);
		}

		public function getPlaceBySourceReference($sourceReference){
			return $this->toObject($this->api->getPlaceDetails($sourceReference)->result);
		}

		public function customFillProperty($property, $data, &$object){
			switch($property){
				case 'latitude':
					if(isset($data->geometry->location->lat)) return $data->geometry->location->lat;
                	else  return Array();
					break;
				case 'longitude':
					if(isset($data->geometry->location->lng)) return $data->geometry->location->lng;
                	else  return Array();
					break;
				case 'id':
					if(isset($data->place_id)) return $data->place_id;
                	else  return Array();
					break;
				case 'opening_hours':
					if(isset($data->opening_hours->periods)) return $data->opening_hours->periods;
                	else  return Array();
					break;
				case 'rating':
					if(isset($data->rating)) return $data->rating;
                	else  return Array();
					break;
				default:
					return $object->$property;
					break;
			}
		}
	}

?>