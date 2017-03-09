<?php
    namespace schedule\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');    
    require_once ('../../core/config/DBConfig.class.php');
    
    class ScheduleDAO extends \core\dao\GenericDAO {
        public function __construct() {
           global $pdo;
            parent::init($pdo, 'schedule');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getById($id, $identifier = 'schedule_id') {
            return parent::getById($id, $identifier);
        }
        
        public function insertRecord($properties) {
            return parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            return parent::insertRecords($array);
        }
        
        public function updateRecordById($properties, $id, $identifier = NULL) {
            return parent::updateRecordById($properties, $id, $identifier);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function getAllSchedules(){
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table ORDER BY last_started");
            $succes =  $query->execute(array());
            if(!$succes){
                errorHandler();
                return;
            }

            return $query->fetchAll(\PDO::FETCH_ASSOC);
        }
        
        public function startScheduleById($scheduleId){
            $query = $this->DB->prepare("UPDATE $this->table SET last_started = ? WHERE schedule_id = ?");
            
            $succes = $query->execute(array(date('Y-m-d H:i:s'), $scheduleId));
            if(!$succes) {
               errorHandler();
               return;
            }
        }
        
        public function stopScheduleById($scheduleId){
            $query = $this->DB->prepare("UPDATE $this->table SET last_stopped = ? WHERE schedule_id = ?");
            
            $succes = $query->execute(array(date('Y-m-d H:i:s'), $scheduleId));
            if(!$succes) {
               errorHandler();
               return;
            }
        }
    }
?>
