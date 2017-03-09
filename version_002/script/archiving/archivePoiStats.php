<?php
    error_reporting(E_ALL); ini_set('display_errors', '1');
    
    // include_once($_SERVER['DOCUMENT_ROOT'] . 'initSettings.php');
    include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

    require_once (ROOT . 'core/config/DBConfig.class.php');
    $dbConfig = new \core\config\DBConfig();
    $db = $dbConfig->conn();
    
    $query = $db->prepare("select distinct DATE_FORMAT(poi_stats.timestamp,'%Y%m%d') day from poi_stats order by day");
    $query->execute(array());
    $result = $query->fetchAll(\PDO::FETCH_ASSOC);

    var_dump($result);

    if(count($result) > 1){
        echo 'true';
        array_pop($result); //pop off the current day
        for($i=0; $i<count($result); $i++){
            $query = $db->prepare("CREATE TABLE IF NOT EXISTS poi_stats_".$result[$i]['day']."(
                                    `source_reference_poi_metric_id` int(11) NOT NULL,
                                    `number` int(11) NOT NULL,
                                    `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");
            $query->execute(array());

            $query = $db->prepare("INSERT INTO poi_stats_".$result[$i]["day"]." SELECT source_reference_poi_metric_id, number, timestamp
                                   FROM poi_stats WHERE DATE_FORMAT(poi_stats.timestamp,'%Y%m%d') = '".$result[$i]["day"]."'");
            $query->execute(array());

            $query = $db->prepare("DELETE FROM poi_stats WHERE DATE_FORMAT(poi_stats.timestamp,'%Y%m%d') = '".$result[$i]["day"]."'");
            $query->execute(array());
        }
        
    }
    

?>
