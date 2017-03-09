<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceDAO extends \core\dao\GenericDAO {        
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'source_id') {
            parent::getById($id, $identifier);
        }
        
        public function getByName($name){
            return parent::getById($name, 'source_name');
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
    }
?>
