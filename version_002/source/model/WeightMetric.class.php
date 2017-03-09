<?php
    namespace source\model;
    require_once ('../core/model/BaseModel.class.php');
    class WeightMetric extends \core\model\BaseModel {
        public $metric_id;
        public $overall_weight;
        public $overall_weight_custom;
        public $real_time_weight;
        public $real_time_weight_custom;
        public $future_weight;
        public $future_weight_custom;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('metric_id'=>'int', 'overall_weight'=>'dec', 'overall_weight_custom'=>'dec', 'real_time_weight'=>'dec', 'real_time_weight_custom'=>'dec', 'future_weight'=>'dec', 'future_weight_custom'=>'dec');
        }
    }
?>
