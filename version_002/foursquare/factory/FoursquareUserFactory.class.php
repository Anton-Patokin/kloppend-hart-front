<?php

namespace foursquare\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'foursquare/dao/FoursquareUserDao.class.php');
require_once(ROOT . 'foursquare/model/FoursquareUser.class.php');

class FoursquareUserFactory extends \core\factory\GenericFactory{
    protected $api;
    protected $dao;
    
    public function __construct(){
        parent::__construct(new \foursquare\model\FoursquareUser());
        $this->dao = new \foursquare\dao\FoursquareUserDao();
        $this->api = new \foursquare\api\FoursquareApi();
    }
    
    public function saveFoursquareUser($foursquareUser){
        if($this->checkUserExists($foursquareUser)){
            $this->dao->updateRecordByPrimaryKey($foursquareUser, array($foursquareUser->foursquare_user_id), array('foursquare_user_id'));
        }else{
            $this->dao->insertRecord($foursquareUser);
        }
    }
    
    
    protected function customFillProperty($property, $data, &$object) {
         switch($property){
           case 'foursquare_user_id':
               return  $data->id;
               break;
           case 'first_name':
                if(isset($data->firstName)) return $data->firstName;
                else return null;
               break;
          case 'last_name':
               if(isset($data->lastName)) return $data->lastName;
                else return null;
               break;
          case 'home_city':
               if(isset($data->homeCity)) return $data->homeCity;
               else return null;
               break;
           default: 
               return $object->$property;
       }
    }


    
    private function checkUserExists($foursquareUser){
        $match = $this->dao->getByPrimaryKey(
                    array($foursquareUser->foursquare_user_id),
                    array('foursquare_user_id'));
        if(empty($match)) return false;
        return true;
    }
}
?>
