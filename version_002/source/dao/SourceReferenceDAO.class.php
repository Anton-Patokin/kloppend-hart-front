<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceReferenceDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_reference');
        }
        
        /*******/
        /* get */
        /*******/
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'source_reference_id') {
            return parent::getById($id, $identifier);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function getSourceReferenceByReference($sourceReference, $sourceId){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ? AND source_reference = ?");
            $succes = $query->execute(array($sourceId, $sourceReference));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetch(\PDO::FETCH_OBJ);

            return $result;
        }
        
        public function getSourceReferencesBySourceId($sourceId){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ?");
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getLinkedSourceReferencesBySourceId($sourceId){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ? AND source_reference_id IN (SELECT source_reference_id FROM source_reference_poi)");
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        /*TODO: take city_id into account*/
        public function getUnlinkedSourceReferencesBySourceId($sourceId, $cityId, $limit){
            $query = $this->DB->prepare("
              SELECT $this->colsString FROM $this->table WHERE source_id = ? AND source_reference_id NOT IN (
                SELECT srp.source_reference_id FROM source_reference_poi srp inner join $this->table sr ON (srp.source_reference_id = sr.source_reference_id) WHERE source_id = ?)
              ORDER BY last_matched limit 0,$limit");
            $succes = $query->execute(array($sourceId, $sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        public function getSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId){
           $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ? AND source_reference_id BETWEEN ? AND ?");
            $succes = $query->execute(array($sourceId, $fromSourceReferenceId, $toSourceReferenceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result; 
        }
        
        public function getLinkedSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId){
           $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ? AND source_reference_id BETWEEN ? AND ? AND source_reference_id IN (SELECT source_reference_id FROM source_reference_poi)");
            $succes = $query->execute(array($sourceId, $fromSourceReferenceId, $toSourceReferenceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result; 
        }
        
        
        public function getExistingSourceReferences($sourceId, $sourceReferences){
            $query = $this->DB->prepare("SELECT source_reference FROM $this->table WHERE source_reference IN ('".implode("','", $sourceReferences)."') AND source_id = ?" );
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = array();
            while($col = $query->fetchColumn()){
                $result[] = $col;
            }
            return $result; 
        }
        
        public function getTotalFetchedSince($sinceDate){
            $query = $this->DB->prepare("SELECT count(source_reference_id) FROM $this->table WHERE last_fetched > ?");

            $succes = $query->execute(array($sinceDate));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchColumn(0);
            return $result;
        }

        public function getLastFetched(){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE last_fetched = (select max(last_fetched) from source_reference)");

            $succes = $query->execute(array());
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
        
        /**********/
        /* insert */
        /**********/
        public function insertRecord($properties) {
            return parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
        
        /**********/
        /* update */
        /**********/
        public function updateRecordByPrimaryKey($properties, $values, $identifiers = array('source_reference_id')) {
            parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
        }
        
        //function to update by Source_reference and source_id, instead of by primary Key
        public function updateSourceReferenceBySourceId($sourceReference){
            $query = $this->DB->prepare("UPDATE $this->table SET reference_name = ? WHERE source_id = ? AND source_reference = ?");
            $succes =  $query->execute(array($sourceReference->reference_name, $sourceReference->source_id, $sourceReference->source_reference));
            if(!$succes){
                errorHandler();
                return;
            }
        }
    }
?>
