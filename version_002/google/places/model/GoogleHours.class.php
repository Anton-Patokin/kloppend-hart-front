<?php

namespace google\places\model;

class GoogleHours extends \core\model\BaseModel{
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'place_day'=>'int',
              'place_start'=>'string',
              'place_start'=>'string',
              'place_open'=>'boolean',
              'times_opened'=>'int',
              'hours' => 'object'
         );
    }
}
?>
