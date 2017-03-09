<?php

namespace source\service;
require_once ('iService.php');
require_once(ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
    
class SourceReferencePoiService {
    
    protected $factory;
    
    public function __construct() {
        $this->factory = new \source\factory\SourceReferencePoiFactory();
    }
    
    public function getSourceReferencePoisByPoiId($poiId, $sourceId){
        return $this->factory->getSourceReferencePoisByPoiId($poiId, $sourceId);
    }
    
}

?>
