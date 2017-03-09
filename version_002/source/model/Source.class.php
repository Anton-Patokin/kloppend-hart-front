<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class Source extends \core\model\BaseModel {
        public $source_id;
        public $source_name;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_id'=>'int', 'source_name'=>'string');
        }
    }
?>
