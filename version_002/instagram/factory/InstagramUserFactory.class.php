<?php

namespace instagram\factory;

require_once(ROOT . 'instagram/model/InstagramUser.class.php');
require_once(ROOT . 'instagram/api/InstagramApi.class.php');
require_once(ROOT . 'instagram/dao/InstagramUserDao.class.php');

class InstagramUserFactory extends \core\factory\GenericFactory{
    
    protected $api;
    protected $dao;
    
    public function __construct(){
        parent::__construct(new \instagram\model\InstagramUser());
        $this->api = new \instagram\api\InstagramApi();
        $this->dao = new \instagram\dao\InstagramUserDao();
    }
    
    public function saveInstagramUser($instagramUser){
        if($this->checkInstagramUserExists($instagramUser)){
           $this->dao->updateRecordByPrimaryKey($instagramUser, array($instagramUser->instagram_user_id), array('instagram_user_id'));
        }else{
           $this->dao->insertRecord($instagramUser);
        }
    }
    
    public function customFillProperty($property, $data, &$object) {
        switch($property){
            case 'instagram_user_id':
                return $data->id;
                break;
            default : 
                return $object->$property;
                break;
        }
    }
    
    private function checkInstagramUserExists($instagramUser){
        $match = $this->dao->getByPrimaryKey(
                    array($instagramUser->instagram_user_id),
                    array('instagram_user_id'));
        if(empty($match)) return false;
        return true;
    }
       
}
?>
