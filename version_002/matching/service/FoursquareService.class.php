<?php
    namespace matching\service;
    require_once ('iService.php');
    require_once(ROOT . 'matching/factory/FoursquareMatchingFactory.class.php');
    
    class FoursquareService implements \matching\service\iService{   
        
        private $factory;
        
        public function __construct() {
           $this->factory = new \matching\factory\FoursquareMatchingFactory();
        }
        
        public function matchRelevantReferences($cityId){
            return $this->factory->matchRelevantReferences($cityId);
        }
        
    }
?>