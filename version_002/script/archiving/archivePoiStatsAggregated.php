<?php
    error_reporting(E_ALL); ini_set('display_errors', '1');
    
    // include_once($_SERVER['DOCUMENT_ROOT'] . 'initSettings.php');
    include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

    require_once (ROOT . 'core/config/DBConfig.class.php');
    $dbConfig = new \core\config\DBConfig();
    $db = $dbConfig->conn();
    
    $query = $db->prepare("select distinct DATE_FORMAT(poi_stats_time_aggregated.from_time,'%Y%m%d') day from poi_stats_time_aggregated order by day");
    $query->execute(array());

    $result = $query->fetchAll(\PDO::FETCH_ASSOC);

    if(count($result) > 1){
        array_pop($result); //pop off the current day
        for($i=0; $i<count($result); $i++){
            $query = $db->prepare("CREATE TABLE IF NOT EXISTS `poi_stats_time_aggregated_".$result[$i]["day"]."` (
                                    `source_reference_poi_metric_id` int(11) NOT NULL,
                                    `differential_value` int(11) NOT NULL,
                                    `from_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                    `to_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
                                    `metric_id` int(11) NOT NULL,
                                    `poi_id` int(11) NOT NULL,
                                    `total_value` int(11) DEFAULT NULL,
                                    UNIQUE KEY `from_time_id1` (`source_reference_poi_metric_id`,`from_time`,`to_time`),
                                    KEY `fk_poi_stats_time_aggregated_source_reference_poi_metric1_idx` (`source_reference_poi_metric_id`) USING BTREE
                                  ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");
            $query->execute(array());
            
            $query = $db->prepare("INSERT INTO poi_stats_time_aggregated_".$result[$i]["day"]." SELECT * FROM poi_stats_time_aggregated
                                    WHERE DATE_FORMAT(poi_stats_time_aggregated.from_time,'%Y%m%d') = '".$result[$i]["day"]."'");
            $query->execute(array());
            
            $query = $db->prepare("DELETE FROM poi_stats_time_aggregated WHERE DATE_FORMAT(poi_stats_time_aggregated.from_time,'%Y%m%d') = '".$result[$i]["day"]."'");
            $query->execute(array());
        }
        
    }
    

?>
