<?php
    namespace instagram\factory;
    
    require_once (ROOT . 'instagram/api/InstagramApi.class.php');
    require_once (ROOT . 'instagram/model/InstagramMedia.class.php');
    require_once (ROOT . 'instagram/dao/InstagramMediaDao.class.php');
    require_once (ROOT . 'instagram/factory/InstagramLocationFactory.class.php');
    require_once (ROOT . 'instagram/factory/InstagramUserFactory.class.php');
   
    class InstagramMediaFactory extends \core\factory\GenericFactory{
        
        protected $api;
        protected $instagramLocationFactory;
        protected $instagramUserFactory;
        protected $dao;
        
        public function __construct() {
            parent::__construct(new \instagram\model\InstagramMedia());
            $this->api = new \instagram\api\InstagramApi();
            $this->dao = new \instagram\dao\InstagramMediaDao();
            $this->instagramLocationFactory = new \instagram\factory\InstagramLocationFactory();
            $this->instagramUserFactory     = new \instagram\factory\InstagramUserFactory();
        }      
        
        public function saveInstagramMedia($instagramMedia){
            if($this->checkMediaExists($instagramMedia)){
                $this->dao->updateRecordByPrimaryKey($instagramMedia, array($instagramMedia->instagram_media_id), array('instagram_media_id'));
            }else{
                $this->dao->insertRecord($instagramMedia);
            }
        }
        
        private function checkMediaExists($instagramMedia){
             $match = $this->dao->getByPrimaryKey(
                    array($instagramMedia->instagram_media_id),
                    array('instagram_media_id'));
             if(empty($match)) return false;
             return true;
        }
        
        //create InstagramObject By instagram location id
        public function createInstagramMediaByLocationId($locationId){
          $media = $this->api->getLocationMediaById($locationId);
          
          if(empty($media)) return null;
          else return $this->toArray($media);
          
        }  
        
        public function customFillProperty($property, $data, &$object) {
            switch($property){
                case 'instagram_media_id':
                    return $data->id;
                    break;
                case 'tags':
                    if(isset($data->tags))return implode(',', $data->tags);
                    else return NULL;
                    break;
                case 'location':
                    return $this->instagramLocationFactory->toObject($data->location);
                    break;
                case 'likes':
                    return $data->likes->count;
                    break;
                case 'low_resolution_image' :
                    return $data->images->low_resolution->url;
                    break;
                case 'standard_resolution_image' :
                    return $data->images->standard_resolution->url;
                    break;
                case 'thumbnail' :
                    return $data->images->thumbnail->url;
                    break;
                case 'caption':
                    if(isset($data->caption->text)) return $data->caption->text;
                    else return NULL;
                    break;
                case 'user':
                    return $this->instagramUserFactory->toObject($data->user);
                    break;
                case 'created_time':
                    return date('Y-m-d H:i:s', $data->created_time);
                    break;
                default: 
                    return $object->$property;
            }
            
        }
        
    }
?>
