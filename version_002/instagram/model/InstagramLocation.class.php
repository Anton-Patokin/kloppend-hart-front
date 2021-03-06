<?php

	namespace instagram\model;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'google/maps/model/GeoLocation.class.php');

	/**
	* 
	*/
	class InstagramLocation extends \google\maps\model\GeoLocation
	{

		public $id;
		public $name;

		function __construct()
		{
			parent::__construct();
			$this->meta->propertyTypes['id'] = 'string';
			$this->meta->propertyTypes['name'] = 'string';
		}
	}

?>