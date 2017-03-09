<?php
    namespace source\dao;
    require_once ('../core/dao/GenericDAO.class.php');
    require_once ('../core/config/DBConfig.class.php');
    class WeightMetricDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'weight_metric');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'metric_id') {
            parent::getById($id, $identifier);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
    }
?>
