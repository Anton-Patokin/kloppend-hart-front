<?php
    namespace aggregated\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class PoiStatsTimeAggregated extends \core\model\BaseModel {
        public $source_reference_poi_metric_id;
        public $differential_value;
        public $from_time;
        public $to_time;
        public $metric_id;
        public $poi_id;
        public $total_value;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_poi_metric_id'=>'int', 'differential_value'=>'int', 'from_time'=>'date', 'to_time'=>'date', 'metric_id'=>'int', 'poi_id'=>'int', 'total_value'=>'int');
        }
    }
?>
