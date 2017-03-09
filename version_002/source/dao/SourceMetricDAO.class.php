<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceMetricDAO extends \core\dao\GenericDAO {
        
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_metric');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'metric_id') {
            return parent::getById($id, $identifier);
        }
        
        public function getSourceMetricsBySourceId($sourceId){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ?");
            $succes = $query->execute(array($sourceId));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_OBJ);
            return $result;
        }
        
        public function getSourceMetricByMetricNameBySourceId($metricName, $sourceId){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE source_id = ? AND metric_name = ?");
            $succes = $query->execute(array($sourceId, $metricName));
             if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetch(\PDO::FETCH_OBJ);
            return $result;
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
    }
?>
