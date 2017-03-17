<?php

namespace foursquare\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'foursquare/dao/FoursquareTipDao.class.php');
require_once(ROOT . 'foursquare/model/FoursquareTip.class.php');
require_once(ROOT . 'foursquare/api/FoursquareAPI.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareUserFactory.class.php');

class FoursquareTipFactory extends \core\factory\GenericFactory{
    protected $api;
    protected $dao;
    
    protected $userFactory;
    
    public function __construct(){
        parent::__construct(new \foursquare\model\FoursquareTip());
        $this->dao = new \foursquare\dao\FoursquareTipDao();
        $this->api = new \foursquare\api\FoursquareApi();
        $this->object = new \foursquare\model\FoursquareTip();
        $this->userFactory = new \foursquare\factory\FoursquareUserFactory();
    }
    
    public function saveFoursquareTip($foursquareTip){
        if($this->checkTipExists($foursquareTip)){
            $this->dao->updateRecordByPrimaryKey($foursquareTip, array($foursquareTip->foursquare_tip_id), array('foursquare_tip_id'));
        }else{
            $this->dao->insertRecord($foursquareTip);
        }
    }
    
    public function createFoursquareTipsByNid($nid){
        return $this->dao->getFoursquareTipsByNid($nid);
    }
    
    private function checkTipExists($foursquareTip){
        $match = $this->dao->getByPrimaryKey(
                    array($foursquareTip->foursquare_tip_id),
                    array('foursquare_tip_id'));
        if(empty($match)) return false;
        return true;
    }
    
    protected function customFillProperty($property, $data, &$object) {
         switch($property){
           case 'user' :
                if (isset($data->user)) {
                   return $this->userFactory->toObject($data->user);
                 }             
                break;
           case 'source_reference_id':
               return  null;
               break;
           case 'foursquare_tip_id':
               return $data->id;
               break;
           case 'created_at':
               return  \date('Y-m-d H:i:s', $data->createdAt);
               break;
           default: 
               return $object->$property;
        }
    }
}
?>
