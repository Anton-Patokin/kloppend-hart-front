<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/InstagramMatchingFactory.class.php');
    
    class InstagramService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\InstagramMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return $this->factory->matchRelevantReferences($cityId);
        }
        
    }
?>