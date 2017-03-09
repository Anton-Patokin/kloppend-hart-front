<?php
    namespace google\maps\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class GeoLocation extends \core\model\BaseModel{
        public $latitude;
        public $longitude;
        
         public function __construct() {
            parent::__construct();
            $this->meta->propertyTypes = array(
               'latitude' => 'dec',
               'longitude' => 'dec'
            );
         }
    }   
    
?>
