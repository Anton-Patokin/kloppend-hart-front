<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceReferencePoiMetricDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_reference_poi_metric');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'source_reference_poi_metric_id') {
            return parent::getById($id, $identifier);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function updateRecordByPrimaryKey($properties, $values, $identifiers = array('source_reference_poi_metric_id')) {
            return parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
        }
        
        public function updateRecordById($properties, $id, $identifier = 'source_reference_poi_metric_id') {
            parent::updateRecordById($properties, $id, $identifier);
        }
        
        public function updateLastFetchedById($id, $lastFetched = null){
            if(is_null($lastFetched)) $lastFetched = date('Y-m-d H:i:s');
            $query = $this->DB->prepare("UPDATE $this->table SET last_fetched = ? WHERE source_reference_poi_metric_id = ?");
            $succes = $query->execute(array($lastFetched, $id));
            if(!$succes) {
               errorHandler();
               return;
            }
        }
        
        public function getSourceReferencePoiMetricsByNidBySourceId($nid, $sourceId){
             $query = $this->DB->prepare("SELECT srpm.* FROM poi p
                                            JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                                            JOIN source_reference_poi_metric srpm ON srpm.source_reference_poi_id = srp.source_reference_poi_id
                                            JOIN source_metric sm ON sm.metric_id = srpm.metric_id
                                            WHERE nid = ?
                                            AND source_id = ?");
            $succes = $query->execute(array($nid, $sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }


        public function insertRecord($properties) {
            return parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            return parent::insertRecords($array);
        }
        
         public function getSourceReferencePoiMetricSourceMetricBySourceReferencePoiId($sourceReferencePoiId){
            $query = $this->DB->prepare("SELECT srpm.source_reference_poi_metric_id, sm.metric_name, sm.source_id, sr.source_reference  FROM source_reference_poi srp
                                            JOIN source_reference_poi_metric srpm ON srp.source_reference_poi_id = srpm.source_reference_poi_id
                                            JOIN source_metric sm ON sm.metric_id = srpm.metric_id
                                            JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                            WHERE srp.source_reference_poi_id = ?");
            $succes = $query->execute(array($sourceReferencePoiId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getSourceReferencePoiMetricsInRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId){
            $query = $this->DB->prepare("SELECT * FROM $this->table WHERE source_reference_poi_metric_id BETWEEN ? AND ? ");
            $succes = $query->execute(array($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
            
        }
        
        public function getNextSourceReferencePoiMetrics($batchSize, $batchOffset = 0){
            $query = $this->DB->prepare("SELECT * FROM $this->table ORDER BY last_aggregated, source_reference_poi_metric_id LIMIT ?,?");
            $succes = $query->execute(array($batchOffset, $batchSize));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function updateLastAggregatedById($sourceReferencePoiMetricId){
             $query = $this->DB->prepare("UPDATE $this->table SET last_aggregated = ? WHERE source_reference_poi_metric_id = ?");
            $succes = $query->execute(array(date('Y-m-d H:i:s'), $sourceReferencePoiMetricId));
            if(!$succes) {
               errorHandler();
               return;
            }
        }
    }
?>
