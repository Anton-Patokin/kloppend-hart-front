<?php
namespace instagram\dao;
require_once (ROOT . 'core/dao/GenericDAO.class.php');
require_once (ROOT . 'core/config/DBConfig.class.php');
class InstagramUserDao extends \core\dao\GenericDAO {

    public function __construct() {
       global $pdo;
        parent::init($pdo, "instagram_user");
    }
    
    public function insertRecord($properties) {
        return parent::insertRecord($properties);
    }
    
    public function getByPrimaryKey($values, $identifiers) {
        return parent::getByPrimaryKey($values, $identifiers);
    }
    
    public function updateRecordByPrimaryKey($properties, $values, $identifiers) {
        return parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
    }
}
?>
