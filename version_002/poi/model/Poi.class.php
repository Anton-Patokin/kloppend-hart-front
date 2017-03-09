<?php
    namespace poi\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    
    class Poi extends \core\model\BaseModel {
        public $poi_id;
        public $name;
        public $nid;
        public $city_id;
        public $slug;
        public $latitude;
        public $longitude;
        public $marker_type;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'poi_id'=>'int', 
                 'name'=>'string', 
                 'nid'=>'int', 
                 'city_id'=>'int', 
                 'slug'=>'string',
                 'latitude'=>'dec',
                 'longitude'=>'dec',
                 'marker_type' => 'int'
             );
        }
    }
?>
