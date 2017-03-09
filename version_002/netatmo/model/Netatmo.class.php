<?php
    namespace netatmo\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    
    class Netatmo extends \core\model\BaseModel {
       
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                
             );
        }
    }
?>