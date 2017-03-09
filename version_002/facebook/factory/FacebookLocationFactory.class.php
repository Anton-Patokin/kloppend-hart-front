<?php
 namespace facebook\factory;
 
 require_once(ROOT . '/facebook/model/FacebookLocation.class.php');

class FacebookLocationFactory extends \core\factory\GenericFactory {
    
    public function __construct(){
        parent::__construct(new \facebook\model\FacebookLocation());
    }
}

?>
