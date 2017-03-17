<?php

	namespace instagramTest\dao;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'core/dao/GenericDAO.class.php');
	require_once(ROOT . 'core/config/DBConfig.class.php');
	/**
	* 
	*/
	class InstagramTestUserDao extends \core\dao\GenericDAO
	{
		
		function __construct()
		{
			global $pdo;
			parent::init($pdo, "instagram_user");
		}

		public function insertRecord($properties){
			return parent::insertRecord($properties);
		}

		public function getByPrimaryKey($values, $identifiers){
			return parent::getByPrimaryKey($values, $identifiers);
		}

		public function updateRecordByPrimaryKey($properties, $values, $identifiers){
			return parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
		}

		public function getById($id, $identifier = NULL){
			return parent::getById($id, $identifier);
		}
	}

?>