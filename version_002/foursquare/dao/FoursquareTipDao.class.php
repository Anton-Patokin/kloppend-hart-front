<?php
    namespace foursquare\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class FoursquareTipDao extends \core\dao\GenericDAO {
        
        public function __construct() {
            global $pdo;
            parent::init($pdo, "foursquare_tip");
        }
        
        public function updateRecordByPrimaryKey($properties, $values, $identifiers) {
            parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
        }
        
        public function getByPrimaryKey($values, $identifiers) {
            return parent::getByPrimaryKey($values, $identifiers);
        }
        
        public function insertRecord($properties) {
            parent::insertRecord($properties);
        }
        
        public function getFoursquareTipsByNid($nid){
            $query = $this->DB->prepare("SELECT * FROM poi p
                                            JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                                            JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                            JOIN foursquare_tip ft ON ft.source_reference_id = sr.source_reference_id
                                            JOIN foursquare_user fu ON fu.foursquare_user_id = ft.foursquare_user_id
                                            WHERE p.nid = ?");
            $succes = $query->execute(array($nid));
            if(!$succes){
                return;
            }
            
            return $query->fetchAll(\PDO::FETCH_OBJ);
        }
        
    }
?>
