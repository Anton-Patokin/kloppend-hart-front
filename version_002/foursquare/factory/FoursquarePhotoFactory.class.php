<?php

namespace foursquare\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'foursquare/dao/FoursquarePhotoDao.class.php');
require_once(ROOT . 'foursquare/model/FoursquareUser.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareUserFactory.class.php');
require_once(ROOT . 'foursquare/model/FoursquarePhoto.class.php');

class FoursquarePhotoFactory extends \core\factory\GenericFactory{
    protected $api;
    protected $dao;
    protected $userFactory;
    
    public function __construct(){
        parent::__construct(new \foursquare\model\FoursquarePhoto());
        $this->dao = new \foursquare\dao\FoursquarePhotoDao();
        $this->api = new \foursquare\api\FoursquareApi();
        $this->userFactory = new \foursquare\factory\FoursquareUserFactory();
        $this->object = new \foursquare\model\FoursquarePhoto();
    }
    
    public function saveFoursquarePhoto($foursquarePhoto){
        if($this->checkPhotoExists($foursquarePhoto)){
            $this->dao->updateRecordByPrimaryKey($foursquarePhoto, array($foursquarePhoto->foursquare_photo_id), array('foursquare_photo_id'));
        }else{
            $this->dao->insertRecord($foursquarePhoto);
        }
    }
    
    public function getFoursquarePhotoById($foursquarePhotoId){
        return $this->toObject($this->api->GetPublic('photos/'.$foursquarePhotoId), new \foursquare\model\FoursquarePhoto());
    }
    
    public function getFoursquarePhotosByNid($nid){
        return $this->dao->getFoursquarePhotosByNid($nid);
    }
    
    protected function customFillProperty($property, $data, &$object) {
        switch($property){
           case 'source_reference_id':
               return  null;
               break;
           case 'foursquare_photo_id':
               return $data->id;
               break;
           case 'created_at':
               return  date('Y-m-d H:i:s', $data->createdAt);
               break;
           case 'user' : 
               return  $this->userFactory->toObject($data->user);
               break;
           default:
               return $object->$property;
       }
    }
    
    
    
    private function checkPhotoExists($foursquarePhoto){
        $match = $this->dao->getByPrimaryKey(
                    array($foursquarePhoto->foursquare_photo_id),
                    array('foursquare_photo_id'));
        if(empty($match)) return false;
        return true;
    }
}
?>
