<?php

	namespace instagram\factory;

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'instagram/api/instagramApi.class.php');
	require_once(ROOT . 'instagram/model/InstagramMedia.class.php');
	require_once(ROOT . 'instagram/dao/InstagramMediaDao.class.php');
	require_once(ROOT . 'instagram/factory/InstagramLocationFactory.class.php');
	require_once(ROOT . 'instagram/factory/InstagramUserFactory.class.php');
	require_once(ROOT . 'core/factory/GenericFactory.class.php');

	/**
	* 
	*/
	class InstagramMediaFactory extends \core\factory\GenericFactory
	{

		protected $api;
		protected $dao;
		protected $instagramTestLocationFactory;
		protected $instagramTestUserFactory;
		
		function __construct()
		{
			parent::__construct(new \instagram\model\InstagramMedia());
			$this->api = new \instagram\api\instagramApi();
			$this->dao = new \instagram\dao\InstagramMediaDao();
			$this->instagramTestLocationFactory = new \instagram\factory\InstagramLocationFactory();
			$this->InstagramTestUser = new \instagram\factory\InstagramUserFactory();
		}

		public function saveInstagramMedia($instagramMedia)
		{
			if ($this->checkMediaExists($instagramMedia)) {
				$this->dao->updateRecordByPrimaryKey($instagramMedia, array($instagramMedia->instagram_media_id), array('instagram_media_id'));
			} else {
				$this->dao->insertRecord($instagramMedia);
			}
		}

		public function customFillProperty($property, $data, &$object)
		{
			switch($property){
				case 'instagram_media_id':
					return $data->id;
					break;

				case 'likes':
					return $data->likes->count;
					break;

				case 'tags':
					if(isset($data->tags))return implode(',', $data->tags);
					else return NULL;
					break;

				case 'low_resolution_image':
					return $data->images->low_resolution->url;
					break;

				case 'standard_resolution_image':
					return $data->images->standard_resolution->url;
					break;

				case 'thumbnail':
					return $data->images->thumbnail->url;
					break;

				case 'caption':
					if(isset($data->caption->text))return $data->caption->text;
					else return NULL;
					break;

				case 'created_time':
					return date('Y-m-d H:i:s', $data->created_time);
					break;

				case 'instagram_user_id':
                    return $data->user->id;
                    break;

				default:
					return $object->$property;
			}
		}

		private function checkMediaExists($instagramMedia)
		{
			$match = $this->dao->getById($instagramMedia->instagram_media_id);
			if (empty($match)) {
				return False;
			}
			return True;
		}

		public function test()
		{
			// var_dump('test');
			// var_dump($this->api->getRecentMediaOfSelf());
			// var_dump($this->toObject($this->api->getRecentMediaOfSelf()));
			// var_dump($this->checkMediaExists($this->toObject($this->api->getRecentMediaOfSelf())));
			// var_dump($this->saveInstagramMedia($this->toArray($this->api->getRecentMediaOfSelf())));
			// var_dump($this->api->getRecentMediaOfSelf());
			// var_dump($this->toObject($this->api->getRecentMediaOfSelf()));
			// var_dump($this->api->getRecentMediaOfSelf());
			$this->saveInstagramMedia($this->toObject($this->api->getRecentMediaOfSelf(1)));
			// $test = $this->api->getRecentMediaOfSelf();
			// var_dump(date('Y-m-d H:i:s', $test->created_time));
		}
	}

	$test = new InstagramMediaFactory();

	$test->test();

?>