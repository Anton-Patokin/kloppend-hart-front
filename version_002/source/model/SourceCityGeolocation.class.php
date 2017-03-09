<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceCityGeolocation extends \core\model\BaseModel {
        public $longitude;
        public $latitude;
        public $radius;
        public $last_fetched;
        public $source_id;
        public $city_id;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('longitude'=>'dec', 'latitude'=>'dec', 'radius'=>'int', 'last_fetched'=>'date', 'source_id' => 'int', 'city_id' => 'int');
        }
    }
?>
