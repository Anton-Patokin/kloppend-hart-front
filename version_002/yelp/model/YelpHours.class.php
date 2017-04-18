<?php

namespace yelp\model;

class YelpHours extends \core\model\BaseModel{
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'business_day'=>'int',
              'business_start'=>'string',
              'business_end'=>'string',
              'business_open'=>'boolean',
              'hours' => 'object'
         );
    }
}
?>
