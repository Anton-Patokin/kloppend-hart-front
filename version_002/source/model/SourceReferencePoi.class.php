<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceReferencePoi extends \core\model\BaseModel {
        public $source_reference_poi_id;
        public $poi_id;
        public $source_reference_id;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_poi_id'=>'int', 'poi_id'=>'int', 'source_reference_id'=>'int');
        }
    }
?>
