<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceReferencePoiDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_reference_poi');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'source_reference_poi_id') {
            return parent::getById($id, $identifier);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            return parent::insertRecords($array);
        }
        
        public function updateRecordById($properties, $id, $identifier = NULL) {
            parent::updateRecordById($properties, $id, $identifier);
        }
        
        public function getSourceReferencePoiIdsBySourceIdBatch($from, $batchSize, $sourceId){
            $query = $this->DB->prepare("SELECT srp.source_reference_poi_id, sr.source_id FROM source_reference_poi_metric srpm
                                        INNER JOIN source_reference_poi srp ON srpm.source_reference_poi_id = srp.source_reference_poi_id
                                        INNER JOIN source_reference sr ON srp.source_reference_id = sr.source_reference_id
                                        WHERE sr.source_id = ?
                                        ORDER BY srpm.last_fetched
                                        LIMIT ?,?");
            $succes = $query->execute(array($sourceId, $from, $batchSize));
            if(!$succes) {
               errorHandler();
               return;
            }
            return $query->fetchAll(\PDO::FETCH_ASSOC);
            
        }
        
        public function getSourceReferencePoisByPoiId($poiId, $sourceId){
            $query = $this->DB->prepare("SELECT srp.* FROM $this->table srp JOIN source_reference sr ON srp.source_reference_id = sr.source_reference_id
                                         WHERE srp.source_reference_poi_id = ? AND sr.source_id = ?");
            $succes = $query->execute(array($poiId, $sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }
    }
?>
