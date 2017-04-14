<?php
namespace velo\dao;
require_once (ROOT . 'core/dao/GenericDAO.class.php');
require_once (ROOT . 'core/config/DBConfig.class.php');
class VeloDAO extends \core\dao\GenericDAO {
    public function __construct() {
        global $pdo;
        parent::init($pdo, 'velo_antwerpen');
    }

    public function saveVeloStations($item){
        parent::insertRecord($item);
    }
    public function getVeloById($id){
       return parent::getById($id,"velo_id");
    }
}