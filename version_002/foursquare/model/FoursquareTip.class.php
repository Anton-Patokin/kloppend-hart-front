<?php
    namespace foursquare\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class FoursquareTip extends \core\model\BaseModel {        
        
      public $source_reference_id;  
      public $foursquare_tip_id;
      public $user;
      public $created_at;
      public $text;
              
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'source_reference_id'=>'int',
                 'foursquare_tip_id'=>'string',
                 'user' => 'object',
                 'created_at'=>'date',
                 'text'=>'string'
             );
        }
    }
?>
