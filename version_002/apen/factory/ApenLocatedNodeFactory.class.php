<?php
    namespace apen\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');
    require_once (ROOT . 'apen/model/ApenLocatedNode.class.php');
    require_once (ROOT . 'apen/dao/ApenLocatedNodeDAO.class.php');
    require_once (ROOT . 'poi/factory/PoiFactory.class.php');
    require_once (ROOT .'poi/model/Poi.class.php');
    require_once (ROOT .'google/maps/factory/GoogleMapsFactory.class.php');
    class ApenLocatedNodeFactory extends \core\factory\GenericFactory {
        
        public $dao;
        public $poiFactory;
        
        public function __construct() {
            parent::__construct(new \apen\model\ApenLocatedNode());
            $this->dao = new \apen\dao\ApenLocatedNodeDAO();
            $this->poiFactory = new \poi\factory\PoiFactory();
        }  
        
        public function udpatePoisFromApenNodes($cityId = 1){
            $nodes = $this->createAllLocatedNodes();
            $existingPois = $this->poiFactory->createAll();
            foreach($nodes as $node){
                $this->updatePoisFromApenNode($node, $existingPois, $cityId);
            }
        }
        
        public function getTrendingPlaces($offset = 0){
            return $this->dao->getTrendingPlaces($offset);
        }
        
        public function getApenDailyCount($source_reference){
            return $this->dao->getDailyCountByNid($source_reference);
        }
        
        public function updatePoisFromApenNode($node, $existingPois, $cityId){
           
            $newPoi = new \poi\model\Poi();
            $newPoi->nid = $node->nid;
            $newPoi->city_id = $cityId;
            $newPoi->name = $node->title;
            /*if(empty($node->latitude) || empty($node->longitude)) {
                $googleMapsFactory = new \google\maps\factory\GoogleMapsFactory();
                $address = "$node->address,$node->postal_code_city";
                $geoLocation = $googleMapsFactory->createGeolocationFromAddress($address); 
                $node->latitude = $geoLocation->latitude;
                $node->longitude = $geoLocation->longitude;
            }*/
            $newPoi->latitude = $node->latitude;
            $newPoi->longitude = $node->longitude;
            
            $markerType = 0;
           
            if($node->field_soort_cultuur_value != null){
                $markerType = 31;
                if($node->field_soort_cultuur_value == 'Park/tuin') $markerType = 34;
                if($node->field_soort_cultuur_value == 'Museum') $markerType = 32;
            }
            
            if($node->field_soort_vrije_tijd_value != null){
                $markerType = 41;
                if($node->field_soort_vrije_tijd_value == "Toerisme") $markerType = 44;
                if($node->field_soort_vrije_tijd_value == "Sport") $markerType = 43;
            }
            
            if($node->field_soort_uitgaan_value != null){
                $markerType = 51;
                if($node->field_soort_uitgaan_value == 'Theater') $markerType = 54;
                if($node->field_soort_uitgaan_value == 'Club/Discotheek') $markerType = 52;
                if($node->field_soort_uitgaan_value == 'Film') $markerType = 55;
                
            }
            
            if($node->field_soort_over_de_stad_value != null){
                $markerType = 61;
            }
            
            if($node->field_soort_horeca_value != null){
                $markerType = 11;
                if($node->field_soort_horeca_value == 'Restaurant') $markerType = 15;
                if($node->field_soort_horeca_value == 'Cafe') $markerType = 12;
                if($node->field_soort_horeca_value == 'Bed and Breakfast') $markerType = 13;
                if($node->field_soort_horeca_value == 'Hotel') $markerType = 14;
                if($node->field_soort_horeca_value == 'Youth hostels') $markerType = 17;
                if($node->field_soort_horeca_value == 'Verblijfplaats') $markerType = 16;
                
            }
            
            if($node->field_soort_winkel_value != null){
                $markerType = 21;
            }
            
            
            $newPoi->marker_type = $markerType;
            
            $this->poiFactory->savePoi($newPoi);
        }
        
        public function checkCategoryByNid($nid){
            $category = '';
            if($this->dao->checkInCultuur($nid)) $category = 'cultuur';
            if($this->dao->checkInHoreca($nid))  $category =  'horeca';
            if($this->dao->checkInUitgaan($nid)) $category =  'uitgaan';
            if($this->dao->checkInVrijeTijd($nid)) $category =  'vrije_tijd';
            if($this->dao->checkInOverDeStad($nid)) $category =  'over_de_stad';
            if($this->dao->checkInWinkel($nid)) $category =  'winkel';
           
            return $category;
        }
        
        public function getCategoriesByName($category){
            if($category == 'winkel') return $this->dao->getWinkelCategories();
            if($category == 'horeca') return $this->dao->getHorecaCategories();
            if($category == 'cultuur') return $this->dao->getCultuurCategories();
            if($category == 'over_de_stad') return $this->dao->getOverDeStadCategories();
            if($category == 'uitgaan') return $this->dao->getUitgaanCategories();
            if($category == 'vrije_tijd') return $this->dao->getVrijeTijdCategories();
            
           
        }
        
        public function getSubCategoriesByName($category, $subcategory){
         $nodes = array();
         if($category == 'horeca') $nodes = $this->dao->getNodesFromHoreca($subcategory);
         if($category == 'cultuur') $nodes = $this->dao->getNodesFromCultuur($subcategory);
         if($category == 'over_de_stad') $nodes = $this->dao->getNodesFromOverDeStad($subcategory);
         if($category == 'winkel') $nodes = $this->dao->getNodesFromWinkel($subcategory);
         if($category == 'uitgaan') $nodes = $this->dao->getNodesFromUitgaan($subcategory);
         if($category == 'vrije_tijd') $nodes = $this->dao->getNodesFromVrijeTijd($subcategory);
         return $nodes;
        }
        
        //move to other factory
        public function getPlaceByNid($nid){
          return $this->dao->getPlaceByNid($nid);
        }
        
        public function createAllLocatedNodes(){
            return $this->toArray($this->dao->getAll());
        }
        
        public function createLocatedNodesWithoutMatchedPoiForSourceId($sourceId){
            return parent::toArray($this->dao->getLocatedNodesWithoutMatchedPoiForSourceId($sourceId));
        }
        
        public function getImageByNid($nid, $size = "slideshow"){
            return $this->dao->getImageByNid($nid, $size);
        }
        
    }
?>
