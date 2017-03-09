<?php
    namespace dataMining\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class User extends \core\model\BaseModel{
        public $id;
        public $username;
        
         public function __construct() {
            parent::__construct();
            $this->meta->propertyTypes = array(
               'id' => 'string',
               'username' => 'string'
            );
         }
    }
?>

