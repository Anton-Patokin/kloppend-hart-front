<?php
    namespace poi\dao;
    include_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class PoiStatDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'poi_stats');
        }
        
        public function insertRecord($properties) {
            // var_dump($properties);
            parent::insertRecord($properties);
        }
        
        public function getBySourceReferencePoiMetricId($sourceReferencePoiMetricId){
            $query = $this->DB->prepare("SELECT * FROM $this->table WHERE source_reference_poi_metric_id = ?");
            $succes =  $query->execute(array($sourceReferencePoiMetricId));
            if(!$succes){
                errorHandler();
                return;
            }

            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }
        
        public function getPoiStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to){
            $query = $this->DB->prepare("SELECT * FROM $this->table WHERE source_reference_poi_metric_id = ? AND timestamp BETWEEN ? AND ? ORDER BY `timestamp` DESC LIMIT 1");
            $succes = $query->execute(array($sourceReferencePoiMetricId, $from, $to));
            if(!$succes){
                errorHandler();
                return;
            }
            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }
		
        public function getPoiStatsPastBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to){
            $query = $this->DB->prepare("SELECT * FROM $this->table WHERE source_reference_poi_metric_id = ? AND timestamp < ?  ORDER BY `timestamp` DESC LIMIT 1");
            $succes = $query->execute(array($sourceReferencePoiMetricId, $from));
            if(!$succes){
                errorHandler();
                return;
            }
            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }
        
    }
?>
