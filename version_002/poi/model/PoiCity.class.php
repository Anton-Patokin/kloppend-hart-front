<?php
    namespace poi\model;
    require_once ('../../core/model/BaseModel.class.php');
    class PoiCity extends \core\model\BaseModel {
        public $city_id;
        public $city_name;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('city_id'=>'int', 'city_name'=>'string');
        }
    }
?>
