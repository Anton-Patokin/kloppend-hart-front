<?php

namespace google\places\model;

class GoogleRating extends \core\model\BaseModel{
    
    public function __construct() {
         parent::__construct();
         $this->meta->propertyTypes = array(
              'source_reference_id'=>'int',
              'place_rating'=>'float',
              'rating' => 'object'
         );
    }
}
?>
