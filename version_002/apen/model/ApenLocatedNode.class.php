<?php
    namespace apen\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class ApenLocatedNode extends \core\model\BaseModel {
        public $nid;
        public $title;
        public $address;
        public $postal_code_city;
        public $latitude;
        public $longitude;
        public $field_soort_cultuur_value;
        public $field_soort_uitgaan_value;
        public $field_soort_over_de_stad_value;
        public $field_soort_horeca_value;
        public $field_soort_winkel_value;
        public $field_soort_vrije_tijd_value;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'nid'=>'int', 
                 'title'=>'string', 
                 'address'=>'string', 
                 'postal_code_city'=>'string', 
                 'latitude'=>'int', 
                 'longitude'=>'int',
                 'field_soort_vrije_tijd_value' => 'string',
                 'field_soort_cultuur_value' => 'string',
                 'field_soort_uitgaan_value' => 'string',
                 'field_soort_over_de_stad_value' => 'string',
                 'field_soort_horeca_value' => 'string',
                 'field_soort_winkel_value' =>'string'
                 );
        }
    }
?>
