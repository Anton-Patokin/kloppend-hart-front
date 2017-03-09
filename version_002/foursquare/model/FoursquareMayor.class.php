<?php

namespace foursquare\model;

class FoursquareMayor extends \core\model\BaseModel{
    
    public $source_reference_id;
    public $foursquare_user_id;
    public $user;
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'foursquare_user_id'=>'int',
              'user' => 'object'
         );
    }
}
?>
