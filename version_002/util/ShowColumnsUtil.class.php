<?php
    namespace util;
    class ShowColumnsUtil {                
        public static function getColumns($dbConn, $tableName){
            $DB = $dbConn;
            $table = $tableName;
            $query = $DB->prepare("SHOW COLUMNS FROM $table");
            $succes = $query->execute();
            if(!$succes) {
                return "failed";
            }
            $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           return $result;
        }
    }
?>
