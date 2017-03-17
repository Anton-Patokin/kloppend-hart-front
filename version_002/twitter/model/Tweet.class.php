<?php

namespace twitter\model;
require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once (ROOT . 'core/model/BaseModel.class.php');

class Tweet extends \core\model\BaseModel {        

    public function __construct() {
        parent::__construct();
         $this->meta->propertyTypes = array();
    }
}
    
?>
