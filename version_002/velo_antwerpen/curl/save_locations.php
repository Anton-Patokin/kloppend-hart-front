<?php
////creat mysql tabele
//CREATE TABLE velo_antwerpen (
//    velo_id INT(6) PRIMARY KEY,
//name VARCHAR(30) NOT NULL,
//aantal_loc int(6) NULL,
//point_lat DECIMAL(21,20) NOT NULL,
//point_lng DECIMAL(21,20) NOT NULL,
//obj_type VARCHAR(30) NULL,
//creat_date TIMESTAMP
//)


require_once('/get_lat_long_for_adress.php');
error_reporting(E_ALL);
ini_set('display_errors', '1');

// include_once($_SERVER['DOCUMENT_ROOT'] . 'initSettings.php');
include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

require_once(ROOT . 'core/config/DBConfig.class.php');
$dbConfig = new \core\config\DBConfig();
$db = $dbConfig->conn();


$velo_station = get_lat_long('http://datasets.antwerpen.be/v4/gis/velostation.json');
foreach ($velo_station->data as $key => $station) {

    $query = $db->prepare("SELECT * FROM velo_antwerpen WHERE velo_id =" . $station->id);
    $query->execute(array());
    $result = $query->fetchAll(\PDO::FETCH_ASSOC);
    if (!isset($result)) {
        $query = $db->prepare("INSERT INTO `velo_antwerpen`(`velo_id`, `name`, `aantal_loc`, `point_lat`, `point_lng`, `obj_type`, `creat_date`)
VALUES (" . $station->id . ",'" . $station->naam . "'," . $station->aantal_loc . "," . $station->point_lat . "," . $station->point_lng . ",'" . $station->obj_type . "'," . time() . ")");
        $query->execute(array());
    }
};
?>