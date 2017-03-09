<?php
    namespace source\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class SourceCityGeolocationDao extends \core\dao\GenericDAO {        
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'source_city_geolocation');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
       public function getByPrimaryKey($values, $identifiers) {
           return parent::getByPrimaryKey($values, $identifiers);
       }
       
       public function updateRecordByPrimaryKey($properties, $values, $identifiers) {
           parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
       }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
        
        public function getSourceCityGeolocationsBySourceId($source_id, $limit, $orderBy = true){
            $sql = "SELECT $this->colsString FROM $this->table WHERE source_id = ?";
            if($orderBy) $sql .= " ORDER BY last_fetched ASC ";
            $sql .= " LIMIT ?";
            $query = $this->DB->prepare($sql);
            $succes = $query->execute(array($source_id, $limit));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
    }
?>
