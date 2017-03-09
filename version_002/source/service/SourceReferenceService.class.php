<?php

namespace source\service;
require_once ('iService.php');
require_once(ROOT . 'source/factory/SourceReferenceFactory.class.php');
    
class SourceReferenceService {
    
    protected $factory;
    
    public function __construct() {
        $this->factory = new \source\factory\SourceReferenceFactory();
    }
    
    public function getSourceReferenceById($sourceReferenceId){
        return $this->factory->getSourceReferenceById($sourceReferenceId);
    }
    
}

?>
