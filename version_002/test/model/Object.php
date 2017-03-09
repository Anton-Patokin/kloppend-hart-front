<?php
    require_once('../core/model/BaseModel.class.php');
    class Object extends core\model\BaseModel{
        public $city_id;
        public $street;
        public $number;
        
        public function __construct() {
            parent::__construct();
            $this->meta->propertyTypes = array('city_id'=>'int', 'street'=>'string', 'number'=>'int');
        }

    }

?>
