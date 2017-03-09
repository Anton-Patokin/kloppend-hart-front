<?php
    require_once ('../database/DBConfig.class.php');
    require_once ('../core/dao/GenericDAO.class.php');
    
    class TestDAO2 extends core\dao\GenericDAO{
        
        public function __construct(){
            $dbConfig = new DBConfig();
            parent::init($dbConfig->conn('localhost','root','','test'), "address");
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($value, $identifier = NULL) {
            return parent::getById($value, $identifier);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
        
        public function updateRecordById($properties, $id, $indentifier = NULL) {
            parent::updateRecordById($properties, $id, $indentifier);
        }
        
        public function updateRecordByPrimaryKey($properties, $values, $indentifiers) {
            parent::updateRecordByPrimaryKey($properties, $values, $indentifiers);
        }
    }
    
?>
