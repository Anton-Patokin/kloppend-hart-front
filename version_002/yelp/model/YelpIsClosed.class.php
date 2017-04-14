<?php

namespace yelp\model;

class YelpIsClosed extends \core\model\BaseModel{
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'business_is_closed'=>'bool',
              'is_closed' => 'object'
         );
    }
}
?>
