<?php
 
 namespace poi\factory;

 require_once ROOT . 'core/factory/GenericFactory.class.php';
 require_once ROOT . 'poi/model/Poi.class.php';
 require_once ROOT . 'poi/dao/PoiDAO.class.php';
 require_once ROOT . 'poi/model/PoiSourceReference.class.php';
 require_once(ROOT . 'antwerp/grid/libs/gps_class.php');
 require_once(ROOT . 'source/factory/SourceFactory.class.php');
 require_once(ROOT . 'apen/factory/ApenLocatedNodeFactory.class.php');
 
 class PoiFactory extends \core\factory\GenericFactory{
     
     protected $dao;
     protected $apenLocatedNodeFactory;
     protected $sourceFactory;
     
     public function __construct() {
       parent::__construct(new \poi\model\Poi());
       $this->dao = new \poi\dao\PoiDAO();
       $this->sourceFactory = new \source\factory\SourceFactory();
     }
     
     public function createAll(){
         return $this->toArray($this->dao->getAll());
     }
     
     public function savePoi($poi){
         $match = $this->checkPoiExists($poi);
         if(!$match) return $this->dao->insertRecord($poi);
         else{
             $poi->poi_id = $match->poi_id;
             $poi->latitude = $match->latitude;
             $poi->longitude = $match->longitude;
             return $this->dao->updateRecordById($poi, $poi->nid, 'nid');
         }
     }
     
     //check poi exists
     public function checkPoiExists($poi){
         $match = $this->dao->getByPrimaryKey(
                    array($poi->nid),
                    array('nid'));
        if(empty($match)) return false;
        return $match;
     }
     
     public function getNearbyPoisByNid($nid, $distance = 75){
         $centerPoi = $this->getPoiByNid($nid);
         $pois = $this->createAll();
         $results = array();
         $results['center'] = $centerPoi;
         foreach($pois as $poi){
             $calcDistance = new \antwerp\grid\libs\calcMiles($centerPoi->latitude, $centerPoi->longitude, $poi->latitude, $poi->longitude, 'meter');
           
             if($calcDistance->lastResult < $distance && $poi->nid !=  $results['center']->nid)
              $results['near'][] = $poi;
         }
         return $results;
     }
     
     public function createTrendingPoisBySourceId($sourceId, $startDate, $endDate){
         return $this->dao->getTrendingPoisBySourceId($sourceId, $startDate, $endDate);
     }
     
     public function getNearbyTrendingPoisByGeocode($lat, $lng, $startDate, $endDate, $source, $distance = 200){
         //get Trending places 
         $pois = $this->createTrendingPoisBySourceId($this->sourceFactory->createSourceByName($source)->source_id, $startDate, $endDate);
         $results = array();
         //calculate wich place is nearby
         foreach($pois as $poi){
             $calcDistance = new \antwerp\grid\libs\calcMiles($lat, $lng, $poi->latitude, $poi->longitude, 'meter');
           
             if($calcDistance->lastResult < $distance)
              $results[] = $poi;
         }
         return $results;
     }
     
     public function getTopTrendingPois($startDate, $endDate, $source){
         return $this->createTrendingPoisBySourceId($this->sourceFactory->createSourceByName($source)->source_id, $startDate, $endDate);
     }
     
     public function getTopPlacesByCategory($category, $subcategory, $startDate, $endDate){
         $this->apenLocatedNodeFactory = new \apen\factory\ApenLocatedNodeFactory();
         //get node ids by category
         $nodeIds = $this->apenLocatedNodeFactory->getSubCategoriesByName($category, $subcategory);
         $places = $this->dao->getTopPoisByNodeIds($nodeIds, $startDate, $endDate);
         return $places;
     }
     
     public function getSearchResults($value){
         return $this->toArray($this->dao->getSearchResults($value));
     }
     
     public function getPoiByNid($nid){
         return $this->toObject($this->dao->getById($nid, 'nid'));
     }
     
     public function createLinkedPoiBySourceId($sourceId){
         return $this->toArray($this->dao->getLinkedPoiBySourceId($sourceId));
     }
      
     public function createPoiBySourceReference($sourceReference){
         return $this->toObject($this->dao->getLinkedPoiBySourceReference($sourceReference));
     }
     
     public function createUnlinkedPoiBySourceId($sourceId){
         return $this->toArray($this->dao->getUnlinkedPoiBySourceId($sourceId));
     }
     
     public function getPoisByGeolocation($latitude, $longitude, $accuracy){
         return $this->toArray($this->dao->getPoisByGeolocation($latitude, $longitude, $accuracy));
     }
     
     public function getPoisByCityId($cityId){
         return $this->toArray($this->dao->getPoisByCityId($cityId));
     }
     
     public function getPoisRangeFrom($cityId, $from, $limit, $excludeFrom = true){
         $from = (empty($from)) ? 0 : $from;
         return $this->toArray($this->dao->getPoisRangeFrom($cityId, $from, $limit, $excludeFrom));
     }
     
 }
?>
