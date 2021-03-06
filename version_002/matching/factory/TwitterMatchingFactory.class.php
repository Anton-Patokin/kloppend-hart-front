<?php

namespace matching\factory;
require_once(ROOT . 'matching/factory/MatchingFactory2.class.php');

class TwitterMatchingFactory extends \matching\factory\matchingFactory2 {
    
    protected $source_name = 'twitter';
    protected $source_id;

    public function __construct(){
        parent::__construct();
    }

    public function matchRelevantReferences($cityId, $limit = 250) {
        //parent::matchRelevantReferences($cityId, $limit);
    }
    
    public function getMatches($includeFlaggedMatch = true){
        return $this->sourceReferencePoiMatchFactory->getMatchesBySourceId($this->source_id, $includeFlaggedMatch);
    }
}
?>
