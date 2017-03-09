<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/TwitterMatchingFactory.class.php');
    
    class TwitterService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\TwitterMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return "twitter matching happens at datamining";
            //return $this->factory->matchRelevantReferences($cityId);
        }
        
        public function getMatches($includeFlaggedMatch = true){
            return $this->factory->getMatches($includeFlaggedMatch);
        }
        
    }
?>