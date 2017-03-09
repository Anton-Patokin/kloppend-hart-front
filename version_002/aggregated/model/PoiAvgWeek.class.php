<?php
    namespace aggregated\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class PoiAvgWeek extends \core\model\BaseModel {
        public $day;
        public $source_reference_poi_metric_id;
        public $average;
        public $last_calculated;


        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('hour'=>'int', 'week_day'=>'int', 'source_reference_poi_metric_id'=>'int', 'average'=>'dec', 'last_calculated'=>'date');
        }
    }
?>
