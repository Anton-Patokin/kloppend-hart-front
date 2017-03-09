<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceMetric extends \core\model\BaseModel {
        public $metric_id;
        public $metric_name;
        public $source_id;
        public $metric_type;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('metric_id'=>'int', 'metric_name'=>'string', 'source_id'=>'int', 'metric_type'=>'string');
        }
    }
?>
