<?php
    namespace source\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class SourceReference extends \core\model\BaseModel {
        public $source_reference_id;
        public $source_reference;
        public $source_id;
        public $reference_name;
        public $referal_reference;
        public $initial_metric_value;
        public $last_matched;
        public $latitude;
        public $longitude;

        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('source_reference_id'   =>'int',
                                                'source_reference'      =>'string',
                                                'source_id'             =>'int',
                                                'reference_name'        =>'string',
                                                'referal_reference'     =>'int',
                                                'initial_metric_value'  =>'int',
                                                'last_matched'          =>'date',
                                                'latitude'              =>'dec',
                                                'longitude'             =>'dec');
        }
    }
?>
