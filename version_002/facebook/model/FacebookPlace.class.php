<?php
    namespace facebook\model;
    require_once ('../../core/model/BaseModel.class.php');
    class FacebookPlace extends \core\model\BaseModel {        
        
        public $id;
        public $name;
        public $category;
        public $location;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'id'=>'string',
                 'name'=>'string',
                 'category'=>'string',
                 'location'=>'object'
             );
        }
    }
?>
