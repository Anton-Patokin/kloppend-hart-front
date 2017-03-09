<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceReferencePoiMatchDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_reference_poi_match');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getByPrimaryKey($values, $identifiers = array('source_reference_id', 'poi_id')) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function insertRecord($properties) {
            return parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            return parent::insertRecords($array);
        }
        
        public function updateRecordByPrimaryKey($properties, $values, $identifiers = array('source_reference_id', 'poi_id')){
            return parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
        }
        
        public function getMatches($sourceId = null, $includeFlaggedMatch = true){
            $colArray = explode(',', $this->colsString);
            array_walk($colArray, function(&$item) { $item = 'srpm.'.$item; });
            
            $condition = (!$includeFlaggedMatch) ? ' WHERE is_match is null' : '';
            if(!empty($sourceId) && is_numeric($sourceId))
                $sourceCondition = 'source_id = '.$sourceId;
            if(!empty($condition))
                $condition.= ' AND '. $sourceCondition;
            else
                $condition = ' WHERE '. $sourceCondition;
            
            $query = $this->DB->prepare("SELECT ".implode(',', $colArray).", sr.source_reference, sr.reference_name, sr.source_id, sr.latitude s_lat, sr.longitude s_lon, p.name, p.nid, p.latitude, p.longitude
                                         FROM $this->table srpm inner join source_reference sr on srpm.source_reference_id = sr.source_reference_id
                                                                inner join poi p on srpm.poi_id = p.poi_id" . $condition . " order by srpm.type desc, score desc, sr.reference_name");
            $succes = $query->execute(array());
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_OBJ);
            return $result;
        }
        
        public function getMatchesBySourceId($sourceId, $includeFlaggedMatch){
            $condition = (!$includeFlaggedMatch) ? ' WHERE is_match is null' : '';
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table srpm inner join
                                                                    (select source_reference_id from source_reference where source_id = ?) sr
                                                                    on srpm.source_reference_id = sr.source_reference_id" . $condition);
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_OBJ);
            return $result;
        }
        
        public function convertMatchesToSourceReferencePois(){
            $query = $this->DB->prepare("INSERT INTO source_reference_poi (poi_id, source_reference_id) 
                                            SELECT poi_id, source_reference_id FROM source_reference_poi_match pm
                                                    WHERE is_match = 1 AND 
                                                    source_reference_id NOT IN (
                                                    SELECT source_reference_id FROM source_reference_poi)");
            $succes = $query->execute();
            if(!$succes) {
               errorHandler();
               return;
            }
        }
        
        public function convertSourceReferencePoisToSourceReferencePoiMetrics(){
            $query = $this->DB->prepare("INSERT INTO source_reference_poi_metric (source_reference_poi_id, metric_id)
                                            SELECT source_reference_poi_id, metric_id FROM source_reference_poi srp
                                                JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                                JOIN source s ON s.source_id = sr.source_id
                                                JOIN source_metric sm ON sm.source_id = s.source_id
                                                WHERE source_reference_poi_id NOT IN (SELECT source_reference_poi_id FROM source_reference_poi_metric)");
            $succes = $query->execute();
            if(!$succes) {
               errorHandler();
               return;
            }
        }
        
        public function convertApenSourceReferencesToSourceReferencePois($sourceId){
            $query = $this->DB->prepare("INSERT INTO source_reference_poi (poi_id, source_reference_id)
                                            SELECT poi_id, source_reference_id FROM source_reference sr
                                            JOIN poi p ON p.nid = sr.source_reference
                                            WHERE source_id = ?
                                            AND source_reference_id NOT IN (
                                            SELECT source_reference_id FROM source_reference_poi)");
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            
        }
    }
?>
