<?php
    namespace poi\dao;
    include_once ('../../core/dao/GenericDAO.class.php');
    require_once ('../../core/config/DBConfig.class.php');
    class PoiCityDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'poi_city');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'city_id') {
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
