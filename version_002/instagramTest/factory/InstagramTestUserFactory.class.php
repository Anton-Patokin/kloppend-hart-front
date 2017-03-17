<?php

	namespace instagramTest\factory;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'instagramTest/api/test.class.php');
	require_once(ROOT . 'instagramTest/model/InstagramTestUser.class.php');
	require_once(ROOT . 'instagramTest/dao/InstagramTestUserDao.class.php');
	require_once(ROOT . 'core/factory/GenericFactory.class.php');

	/**
	* 
	*/
	class InstagramTestUserFactory extends \core\factory\GenericFactory
	{
		
		protected $api;
		protected $dao;

		function __construct()
		{
			parent::__construct(new \instagramTest\model\InstagramTestUser());
			$this->api = new \instagramTest\api\test();
			$this->dao = new \instagramTest\dao\InstagramTestUserDao();
		}

		public function saveInstagramUser($instagramUser){
			//$instagramUser = $this->api->getUserById(1911052429); //array('instagram_user_id'=>1, 'username'=>'tester', 'website'=>'testwebsite.com', 'bio'=>'test bio', 'profile_picture'=>'testFoto', 'full_name'=>'testname');
			if ($this->checkInstagramUserExists($instagramUser)) {
				$this->dao->updateRecordByPrimaryKey($instagramUser, array($instagramUser->instagram_user_id), array('instagram_user_id'));
			} else {
				$this->dao->insertRecord($instagramUser);
			}
		}

		public function checkInstagramUserExists($instagramUser){
			// echo '<pre>';
			// echo $instagramUser['data'];
			// echo '</pre>';
			// var_dump($instagramUser->id);
			$match = $this->dao->getById($instagramUser->instagram_user_id);
			// var_dump($match);
			if ($match) {
				return True;
			}
			return False;
		}

		public function customFillProperty($property, $data, &$object){
			// var_dump($property);
			// var_dump($data->id);
			// var_dump($object);
			switch($property){
				case 'instagram_user_id':
					return $data->id;
					break;
				default:
					return $object->$property;
					break;
			}
		}

		public function test(){
			// $this->saveInstagramUser($this->toObject($this->api->getUserById(1911052429)));
			// $test = ;
			// var_dump($test->data->id);
			// var_dump($this->api->getSelf());
			$this->saveInstagramUser($this->toObject($this->api->getSelf()));
		}
		
	}

	// $test = new InstagramTestUserFactory();

	// $test->test();	

?>