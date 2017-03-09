<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/FacebookMatchingFactory.class.php');
    
    class FacebookService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\FacebookMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return $this->factory->matchRelevantReferences($cityId);
        }
        
        public function getMatches($includeFlaggedMatch = true){
            return $this->factory->getMatches($includeFlaggedMatch);
        }
        
    }
?>