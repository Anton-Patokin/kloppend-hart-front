<?php
    namespace facebook\model;
    require_once (ROOT . '/core/model/BaseModel.class.php');    
    class FacebookLocation extends \core\model\BaseModel {
        
        public $street;
        public $city;
        public $state;
        public $country;
        public $zip;
        public $latitude;
        public $longitude;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'street'=>'string',
                 'city'=>'string',
                 'state'=>'string',
                 'country'=>'string',
                 'zip'=>'string',
                 'latitude'=>'dec',
                 'longitude'=>'dec'
             );
        }
    }
?>
