<?php
    namespace foursquare\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class FoursquarePhoto extends \core\model\BaseModel {        
        
      public $source_reference_id;  
      public $foursquare_photo_id;
      public $created_at;
      public $url;
      public $user;
      public $visibility;
              
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'source_reference_id'=>'int',
                 'foursquare_photo_id'=>'string',
                 'created_at' => 'date',
                 'url'=>'string',
                 'user'=>'object',
                 'visibility' => 'string'
             );
        }
    }
?>
