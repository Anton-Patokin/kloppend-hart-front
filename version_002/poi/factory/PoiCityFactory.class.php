<?php

namespace poi\factory;

require_once '../../core/factory/GenericFactory.class.php';
require_once '../../poi/model/PoiCity.class.php';
require_once '../../poi/dao/PoiCityDao.class.php';

class PoiCityFactory extends \core\factory\GenericFactory{
    
     public function __construct() {
        parent::__construct(new \poi\model\PoiCity());
        $this->dao = new \poi\dao\PoiCityDAO();
     }
     
     public function getPoiCityById($poiCityId){
        return $this->toObject($this->dao->getById($poiCityId));
     }
     
}

?>
