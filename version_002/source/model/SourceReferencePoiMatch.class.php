<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceReferencePoiMatch extends \core\model\BaseModel {
        public $source_reference_id;
        public $poi_id;
        public $type;
        public $score;
        public $is_match;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_id'=>'int', 'poi_id'=>'int', 'type'=>'int', 'score'=>'int', 'is_match'=>'boolean');
        }
    }
?>
