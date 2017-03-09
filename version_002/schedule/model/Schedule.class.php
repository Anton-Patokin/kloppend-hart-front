<?php

 namespace schedule\model;
 
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class Schedule extends \core\model\BaseModel {
        public $schedule_id;
        public $name;
        public $last_started;
        public $last_stopped;
        public $time_limit;
        public $cron_variables;
        public $time_interval;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array('schedule_id'   =>'int', 
                                                'name'          =>'string', 
                                                'last_started'  =>'date', 
                                                'last_stopped'  =>'date', 
                                                'time_limit'    =>'int', 
                                                'cron_variables'=>'string',
                                                'time_interval' =>'int');
        }
    }


?>
