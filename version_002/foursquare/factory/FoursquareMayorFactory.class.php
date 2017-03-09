<?php

namespace foursquare\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'foursquare/dao/FoursquareMayorDao.class.php');
require_once(ROOT . 'foursquare/factory/FoursquareUserFactory.class.php');
require_once(ROOT . 'foursquare/model/FoursquareMayor.class.php');

class FoursquareMayorFactory extends \core\factory\GenericFactory{
    protected $api;
    protected $dao;
    
    protected $userFactory;
    
    public function __construct(){
        parent::__construct(new \foursquare\model\FoursquareMayor());
        $this->dao = new \foursquare\dao\FoursquareMayorDao();
        $this->api = new \foursquare\api\FoursquareApi();
        $this->userFactory = new \foursquare\factory\FoursquareUserFactory();
    }
    
    public function saveFoursquareMayor($foursquareMayor){
         if($this->checkMayorExists($foursquareMayor)){
            $this->dao->updateRecordByPrimaryKey($foursquareMayor, array($foursquareMayor->source_reference_id, $foursquareMayor->foursquare_user_id),   array('source_reference_id', 'foursquare_user_id'));
        }else{
            $this->dao->insertRecord($foursquareMayor);
        }
    }
    
    protected function customFillProperty($property, $data, &$object) {
         switch($property){
            case 'user':
                return  $this->userFactory->toObject($data->user);
                break;
           default:
               return $object->$property;
        }
   }
    
    
    private function checkMayorExists($foursquareMayor){
        $match = $this->dao->getByPrimaryKey(
            array($foursquareMayor->source_reference_id, $foursquareMayor->foursquare_user_id),
            array('source_reference_id', 'foursquare_user_id'));
        if(empty($match)) return false;
        return true;
    }
    
    
}
?>
