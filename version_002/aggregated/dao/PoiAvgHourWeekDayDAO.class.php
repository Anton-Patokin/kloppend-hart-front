<?php
    namespace aggregated\dao;
    include_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class PoiAvgHourWeekDayDAO extends \core\dao\GenericDAO {
        public function __construct() {
            global $pdo;
            parent::init($pdo, 'poi_avg_hour_week_day');
        }
        
        public function getAll() {
            return parent::getAll();
        }
        
        public function getByPrimaryKey($values, $identifiers = array('hour', 'source_reference_poi_mectric_id')) {
            parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function insertRecords($array) {
            parent::insertRecords($array);
        }
    }
?>
