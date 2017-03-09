<?php
    require_once('../core/model/BaseModel.class.php');
    class TestObject extends core\model\BaseModel{
        public $city_id;
        public $city_name;
        public $city_date;
        public $address;
        
        public function __construct() {
            parent::__construct();
            $this->meta->propertyTypes = array('city_id'=>'int', 'city_name'=>'string', 'city_date'=>'date', 'address'=>'object');
        }

    }
?>
