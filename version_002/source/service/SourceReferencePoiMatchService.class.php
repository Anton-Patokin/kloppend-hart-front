<?php

namespace source\service;
require_once ('iService.php');
require_once(ROOT . 'source/factory/SourceReferencePoiMatchFactory.class.php');
    
class SourceReferencePoiMatchService {
    
    protected $factory;
    
    public function __construct() {
        $this->factory = new \source\factory\SourceReferencePoiMatchFactory();
    }
    
    public function getMatches($sourceId = null, $includeFlaggedMatch = true){
        return $this->factory->getMatches($sourceId, $includeFlaggedMatch);
    }
    
    public function markAsMatch($sourceReferenceId, $poiId){
        return $this->factory->markAsMatch($sourceReferenceId, $poiId);
    }
    
    public function markAsNoMatch($sourceReferenceId, $poiId){
        return $this->factory->markAsNoMatch($sourceReferenceId, $poiId);
    }
    
    public function convertMatchesToSourceReferencePois(){
        return $this->factory->convertMatchesToSourceReferencePois();
    }
    
    public function convertSourceReferencePoisToSourceReferencePoiMetrics(){
        return $this->factory->convertSourceReferencePoisToSourceReferencePoiMetrics();
    }
    
}

?>
