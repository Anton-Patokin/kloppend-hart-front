<?php
    namespace dataMining2\dao;
    include_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class TwitterDataMiningDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'twitter_mining_log');
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
        
        public function getTotalFetchedSince($sinceDate){
            $query = $this->DB->prepare("SELECT count(poi_id) FROM $this->table WHERE last_fetched > ?");

            $succes = $query->execute(array($sinceDate));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchColumn(0);
            return $result;
        }

        public function getLastFetched(){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE last_fetched = (select max(last_fetched) from $this->table) ORDER BY poi_id desc LIMIT 0,1");

            $succes = $query->execute(array());
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        }
    }
?>
