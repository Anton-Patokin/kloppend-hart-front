<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/GoogleMatchingFactory.class.php');
    
    class GoogleService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\GoogleMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return $this->factory->matchRelevantReferences($cityId);
        }
        
    }
?>