<?php
require_once (ROOT . 'core/dao/GenericDAO.class.php');
require_once (ROOT . 'core/config/DBConfig.class.php');

class VeloModel extends \core\dao\GenericDAO {
    public function __construct() {
        global $pdo;
        parent::init($pdo, 'velo_antwerpen');
    }

    public function getAllVelo(){
       return parent::getAll();
    }
}

?>