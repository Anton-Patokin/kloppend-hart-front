<?php
include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\settings.php');

require_once(ROOT . 'core/dao/GenericDAO.class.php');
require_once(ROOT . 'core/config/DBConfig.class.php');

class veloController
{

    public function __construct()
    {

    }

    public function getAll()
    {


        error_reporting(E_ALL);
        ini_set('display_errors', '1');

        $dbConfig = new \core\config\DBConfig();
        $db = $dbConfig->conn();
        $query = $db->prepare("SELECT * FROM velo_antwerpen ");
        $query->execute(array());
        $result = $query->fetchAll(\PDO::FETCH_ASSOC);

        echo json_encode($result);

    }
}


?>