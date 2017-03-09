<?php
    namespace poi\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class PoiStat extends \core\model\BaseModel {
        public $source_reference_poi_metric_id;
        public $number;
        public $timestamp;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_poi_metric_id'=>'int', 'number'=>'int', 'timestamp'=>'date');
        }
    }
?>
