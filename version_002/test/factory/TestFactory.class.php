<?php
    require_once ('../core/factory/GenericFactory.class.php');
    require_once ('./model/TestObject.php');
    class TestFactory extends \core\factory\GenericFactory {
        
        public function __construct() {
            parent::init(new TestObject());
        }
        
        public function toObject($result, $object = NULL, $complexProperties = NULL) {
            return parent::toObject($result, $object, $complexProperties);
        }
        
        public function toArray($result, $object = NULL, $complexProperties = NULL) {
            return parent::toArray($result, $object, $complexProperties);
        }
    }
?>
