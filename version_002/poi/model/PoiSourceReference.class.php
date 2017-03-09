<?php
    namespace poi\model;
    require_once (ROOT .'poi/model/Poi.class.php');
    class PoiSourceReference extends \poi\model\Poi {
        public $source_reference;
        
        public function __construct() {
            parent::__construct();
            $this->meta->propertyTypes['source_reference'] = 'string';
        }
    }
?>
