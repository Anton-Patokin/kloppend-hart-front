<?php
    namespace foursquare\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class FoursquareUser extends \core\model\BaseModel {        
          
      public $foursquare_user_id;
      public $first_name;
      public $last_name;
      public $gender;
      public $photo;
      public $home_city;
      public $bio;
              
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'foursquare_user_id'=>'string',
                 'first_name'=>'string',
                 'last_name' => 'string',
                 'gender'=>'string',
                 'photo'=>'string',
                 'home_city' => 'string',
                 'bio' => 'string'
             );
        }
    }
?>
