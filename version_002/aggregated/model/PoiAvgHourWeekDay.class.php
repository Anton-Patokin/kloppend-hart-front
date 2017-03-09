<?php
    namespace aggregated\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class PoiAvgHourWeekDay extends \core\model\BaseModel {
        public $hour;
        public $day;
        public $source_reference_poi_metric_id;
        public $average;
        public $last_calculated;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('hour' => 'int', 'day'=>'int', 'source_reference_poi_metric_id'=>'int', 'average'=>'dec', 'last_calculated'=>'date');
        }
    }
?>

