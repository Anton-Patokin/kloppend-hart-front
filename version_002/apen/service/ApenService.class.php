<?php
    namespace apen\service;
    // require_once ($_SERVER['DOCUMENT_ROOT'] . '/initSettings.php');
    require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');
    require_once(ROOT . 'apen/factory/ApenLocatedNodeFactory.class.php');
    
    class ApenService {   
        
        protected $factory;
        
        public function __construct() {
            $this->factory = new \apen\factory\ApenLocatedNodeFactory();
        }
        
        public function updatePoisFromApenNodes(){
            $this->factory->udpatePoisFromApenNodes();
        }
        
        public function getCategoriesByName($category){
            return $this->factory->getCategoriesByName($category);
        }
        
        public function getPlaceByNid($nid){
            return $this->factory->getPlaceByNid($nid);
        }
        
        public function getNearbyPlacesByNid($nid){
            return $this->factory->getNearbyPlacesByNid($nid);
        }
        
        public function checkCategoryByNid($nid){
            return $this->factory->checkCategoryByNid($nid);
        }
        
        public function getImageByNid($nid){
            return $this->factory->getImageByNid($nid);
        }
            
    }
?>
