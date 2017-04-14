<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/YelpMatchingFactory.class.php');
    
    class YelpService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\YelpMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return $this->factory->matchRelevantReferences($cityId);
        }
        
    }
?>