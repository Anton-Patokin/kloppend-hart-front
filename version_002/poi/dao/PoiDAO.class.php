<?php
    namespace poi\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');    
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class PoiDAO extends \core\dao\GenericDAO {
        public function __construct() {
             global $pdo;
             parent::init($pdo, 'poi');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'poi_id') {
            return parent::getById($id, $identifier);
        }
        
        public function insertRecord($properties) {
            return parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            return parent::insertRecords($array);
        }
        
        public function updateRecordById($properties, $id, $identifier = NULL) {
            return parent::updateRecordById($properties, $id, $identifier);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function getSearchResults($value){
             $query = $this->DB->prepare("
              SELECT * FROM poi
              WHERE name LIKE '%".$value."%'
            ");
            
            $succes = $query->execute();
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getTopPoisByNodeIds($nodeIds, $startDate, $endDate){
            $query = $this->DB->prepare("
              SELECT SUM(differential_value) * coalesce(overall_weight_custom, overall_weight, 1) as total, nid, name FROM poi p
                JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                JOIN source_reference_poi_metric srpm ON srpm.source_reference_poi_id = srp.source_reference_poi_id
                JOIN poi_stats_time_aggregated psta ON psta.source_reference_poi_metric_id = srpm.source_reference_poi_metric_id
                JOIN source_metric sm ON sm.metric_id = srpm.metric_id
		JOIN weight_metric wm ON wm.metric_id = sm.metric_id
                WHERE nid IN(".implode(',', $nodeIds).")
                AND (psta.from_time >= ? AND to_time <= ?)
                GROUP BY nid
                ORDER BY total DESC
            ");
            
            $succes = $query->execute(array($startDate,$endDate));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getLinkedPois($sourceId){
            $query = $this->DB->prepare("
                SELECT p.*, source_reference 
                FROM poi p 
                JOIN source_reference_poi srp ON p.poi_id = srp.poi_id
                JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                WHERE sr.source_id = ?
            ");
            
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getPoisRangeFrom($cityId, $from, $limit, $excludeFrom = true){
            $operator = ($excludeFrom) ? '>' : '>=';
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE city_id = ? AND poi_id $operator ? ORDER BY poi_id LIMIT 0,?");
            
            $succes = $query->execute(array($cityId, $from, $limit));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getLinkedPoiBySourceId($sourceId){
            $query = $this->DB->prepare("
                SELECT p.* 
                FROM poi p 
                JOIN source_reference_poi srp ON p.poi_id = srp.poi_id
                JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                WHERE sr.source_id = ?
             ");

             $succes = $query->execute(array($sourceId));
             if(!$succes) {
                errorHandler();
                return;
             }
             $result = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $result;
         }
         
         public function getUnlinkedPoiBySourceId($sourceId){
             $query = $this->DB->prepare("
                 SELECT * FROM poi WHERE poi_id NOT IN (
                 SELECT p.poi_id FROM poi p 
                 JOIN source_reference_poi srp ON p.poi_id = srp.poi_id
                 JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                 WHERE sr.source_id = ?)");
             $succes = $query->execute(array($sourceId));
             if(!$succes) {
                 errorHandler();
                 return;
             }
             $result = $query->fetchAll(\PDO::FETCH_ASSOC);
             return $result;
         }
         
         public function getLinkedPoiBySourceReference($sourceReference){
             $query = $this->DB->prepare("
                SELECT p.* 
                FROM poi p 
                JOIN source_reference_poi srp ON p.poi_id = srp.poi_id
                JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                WHERE sr.source_id = ? 
                AND sr.source_reference = ?");
             $succes = $query->execute(array($sourceReference->source_id, $sourceReference->source_reference));
             if(!$succes) {
                 errorHandler();
                 return;
             }
             $result = $query->fetch(\PDO::FETCH_ASSOC);
             return $result;
         }
         
         public function getPoisByGeolocation($latitude, $longitude, $accuracy){
            $latitude = round($latitude * $accuracy) / $accuracy;
            $longitude = round($longitude * $accuracy) / $accuracy;
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE round(latitude * $accuracy) / $accuracy = ? AND round(longitude * $accuracy) / $accuracy = ?");
            $succes = $query->execute(array($latitude, $longitude));
            if(!$succes) {
                errorHandler();
                return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result; 
         }
         
         public function getPoisByCityId($cityId){
             $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE city_id = ?");
            
            $succes = $query->execute(array($cityId));
            if(!$succes) {
               errorHandler();
               return;
            }
            
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
         }
         
         public function getTrendingPoisBySourceId($sourceId, $startDate, $endDate, $trendingOffset = 0){
             $query = $this->DB->prepare("SELECT DISTINCT(srp.source_reference_poi_id), p.*, differential_value FROM poi p
                                            JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                                            JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                            JOIN source_reference_poi_metric srpm ON srpm.source_reference_poi_id = srp.source_reference_poi_id
                                            JOIN poi_stats_time_aggregated psta ON srpm.source_reference_poi_metric_id = psta.source_reference_poi_metric_id
                                            WHERE source_id = ?
                                            AND differential_value >= ?
                                            AND from_time >= ? 
                                            AND to_time <= ?
                                            LIMIT 5");
            
            $succes = $query->execute(array($sourceId, $trendingOffset, $startDate, $endDate));
            if(!$succes) {
               errorHandler();
               return;
            }
            
            $result = $query->fetchAll(\PDO::FETCH_OBJ);
            return $result;
         }
    }
?>
