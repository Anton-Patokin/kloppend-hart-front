<?php
namespace poi\factory;

class PoiSourceReferenceFactory extends \core\factory\GenericFactory{
    
    public function __construct() {
        parent::__construct(new \poi\model\PoiSourceReference());
    }
    
}
?>
