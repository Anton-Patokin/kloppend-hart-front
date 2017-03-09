<?php
    namespace poi\model;
    require_once ('../core/model/BaseModel.class.php');
    class WeightPoi extends \core\model\BaseModel {
        public $poi_id;
        public $overall_weight;
        public $real_time_weight;
        public $future_weight;
        public $from;
        public $to;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('poi_id'=>'int', 'overall_weight'=>'dec', 'real_time_weight'=>'dec', 'future_weight'=>'dec', 'from'=>'date', 'to'=>'date');
        }
    }
?>
