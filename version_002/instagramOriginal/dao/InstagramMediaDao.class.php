<?php

namespace instagram\dao;

class InstagramMediaDao extends \core\dao\GenericDAO{
    
    public function __construct(){
        global $pdo;
        parent::init($pdo, 'instagram_media');
    }
    
    public function insertRecord($properties) {
        parent::insertRecord($properties);
    }
    
    public function insertRecords($array) {
        parent::insertRecords($array);
    }
    
    public function getByPrimaryKey($values, $identifiers) {
        return parent::getByPrimaryKey($values, $identifiers);
    }
    
    public function updateRecordByPrimaryKey($properties, $values, $identifiers) {
        return parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
    }
}
?>
