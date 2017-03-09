<?php

namespace twitter\model;
require_once ('../../core/model/BaseModel.class.php');

class Tweet extends \core\model\BaseModel {        

    public function __construct() {
        parent::__construct();
         $this->meta->propertyTypes = array();
    }
}
    
?>
