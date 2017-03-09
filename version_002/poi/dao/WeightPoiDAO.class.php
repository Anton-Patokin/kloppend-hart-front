<?php
    namespace poi\dao;
    require_once ('../core/dao/GenericDAO.class.php');    
    require_once ('../core/config/DBConfig.class.php');
    class WeightPoiDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'weight_poi');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'poi_id') {
            return parent::getById($id, $identifier);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
    }
?>
