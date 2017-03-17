<?php

	namespace instagramTest\model;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'core/model/BaseModel.class.php');

	/**
	* 
	*/
	class InstagramTestUser extends \core\model\BaseModel
	{
		public $instagram_user_id;
		public $username;
		public $website;
		public $bio;
		public $profile_picture;
		public $full_name;
		
		public function __construct()
		{
			parent::__construct();
			$this->meta->propertyTypes['instagram_user_id'] = 'int';
			$this->meta->propertyTypes['username'] = 'string';
			$this->meta->propertyTypes['website'] = 'string';
			$this->meta->propertyTypes['bio'] = 'string';
			$this->meta->propertyTypes['profile_picture'] = 'string';
			$this->meta->propertyTypes['full_name'] = 'string';
		}
	}

?>