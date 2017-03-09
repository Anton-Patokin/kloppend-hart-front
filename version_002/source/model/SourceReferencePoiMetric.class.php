<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceReferencePoiMetric extends \core\model\BaseModel {
        public $source_reference_poi_metric_id;
        public $source_reference_poi_id;
        public $metric_id;
        public $last_fetched;
        public $last_aggregated;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_poi_metric_id'=>'int', 'source_reference_poi_id'=>'int', 'metric_id'=>'int', 'last_fetched'=>'date', 'last_aggregated'=>'date');
        }
    }
?>
