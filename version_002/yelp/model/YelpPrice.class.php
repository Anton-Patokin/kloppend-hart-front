<?php

namespace yelp\model;

class YelpPrice extends \core\model\BaseModel{
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'business_price'=>'string',
              'price' => 'object'
         );
    }
}
?>
