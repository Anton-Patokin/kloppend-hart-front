<?php

	namespace yelp\factory;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'yelp/model/YelpLocation.class.php');
	require_once(ROOT . 'yelp/api/YelpApi.class.php');
	require_once(ROOT . 'core/factory/GenericFactory.class.php');

	/**
	* 
	*/
	class YelpLocationFactory extends \core\factory\GenericFactory
	{
		
		function __construct()
		{
			parent::__construct(new \yelp\model\YelpLocation());
			$this->api = new \yelp\api\YelpApi();
		}

		public function createYelpLocationsByLatLng($geoLocation)
		{
			return $this->toArray($this->api->searchCoordinate($geoLocation->latitude, $geoLocation->longitude, $geoLocation->radius, 20)->businesses);
		}

		public function getBusinessBySourceReference($sourceReference){
			return $this->toObject($this->api->getBusiness($sourceReference));
		}

		public function customFillProperty($property, $data, &$object){
			switch($property){
				case 'latitude':
					if(isset($data->location)) return $data->location->coordinate->latitude;
                	else  return Array();
					break;
				case 'longitude':
					if(isset($data->location)) return $data->location->coordinate->longitude;
                	else  return Array();
					break;
				case 'rating':
					if(isset($data->rating)) return $data->rating;
                	else  return Array();
					break;
				case 'is_closed':
					if(isset($data->is_closed)) return $data->is_closed;
                	else  return Array();
					break;
				case 'review_count':
					if(isset($data->review_count)) return $data->review_count;
                	else  return 0;
					break;
				default:
					return $object->$property;
					break;
			}
		}
	}

?>