<?php
    namespace yelp\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class YelpIsClosedDao extends \core\dao\GenericDAO {
        
        public function __construct() {
            global $pdo;
            parent::init($pdo, "yelp_is_closed");
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
           return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function updateRecordByPrimaryKey($properties, $values, $identifiers) {
            parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
        }

        public function getYelpIsClosedByNid($nid) {
            $query = $this->DB->prepare("SELECT business_is_closed FROM poi p
                                            JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                                            JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                            JOIN yelp_is_closed yis ON yis.source_reference_id = sr.source_reference_id
                                            WHERE p.nid = ?");
            $succes = $query->execute(array($nid));
            if (!$succes) {
                return;
            }

            return $query->fetchAll(\PDO::FETCH_OBJ);
        }
    }
?>
