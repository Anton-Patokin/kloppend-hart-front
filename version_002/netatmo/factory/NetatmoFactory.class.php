<?php

namespace netatmo\factory;

require_once (ROOT . 'core/factory/GenericFactory.class.php');
require_once (ROOT . 'netatmo/model/Netatmo.class.php');
require_once (ROOT . 'netatmo/api/NAApiClient.php');

class NetatmoFactory extends \core\factory\GenericFactory{
    
    public $api;
    
     public function __construct() {
        parent::__construct(new \netatmo\model\Netatmo());
        $this->api = new \netatmo\api\NAApiHelper();
     }
     
     public function createNetatmo(){
         return $this->api->GetLastMeasures();
     }
     
}

?>