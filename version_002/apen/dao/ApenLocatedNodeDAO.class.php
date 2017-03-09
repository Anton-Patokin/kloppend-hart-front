<?php
    namespace apen\dao;
    require_once (ROOT . 'core/dao/GenericDAO.class.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    class ApenLocatedNodeDAO extends \core\dao\GenericDAO {
        
        public function __construct() {
            $dbConfig = new \core\config\DBConfig();
            $pdo = $dbConfig->conn('localhost','root','','locale_apen');
            parent::init($pdo, "node");
        }
        
        public function getAll(){
           $query = $this->DB->prepare("
               SELECT *
                FROM node n
                LEFT JOIN location_instance i ON n.nid = i.nid
                LEFT JOIN location l ON i.lid = l.lid
                LEFT JOIN content_type_plaats p ON n.nid = p.nid
                LEFT JOIN content_field_soort_winkel ctfsw ON ctfsw.nid = n.nid 
                WHERE n.type = ?
                AND n.status = ?
           ");
           $succes = $query->execute(array('plaats', 1));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           return $result;
        }
        
        public function getTrendingPlaces($offset){
            $query = $this->DB->prepare("select nr.nid, nr.title, nc.daycount, l.longitude, l.latitude
                                        from content_type_plaats cte inner join node_revisions nr on cte.nid = nr.nid and cte.vid = nr.vid
                                        inner join node_counter nc on cte.nid = nc.nid
                                        inner join  location_instance li on cte.nid = li.nid
                                        inner join location l on li.lid = l.lid
                                        where nc.daycount >= ?
                                        order by daycount desc");
            $succes = $query->execute(array($offset));
             if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
            
        }
        
        public function getDailyCountByNid($nid){
            $query = $this->DB->prepare("select nr.nid, nr.title, nc.daycount, nc.totalcount, l.longitude, l.latitude
                                        from content_type_plaats cte inner join node_revisions nr on cte.nid = nr.nid and cte.vid = nr.vid
                                        inner join node_counter nc on cte.nid = nc.nid
                                        inner join  location_instance li on cte.nid = li.nid
                                        inner join location l on li.lid = l.lid
                                        where nr.nid = ?");
             $succes = $query->execute(array($nid));
             if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetch(\PDO::FETCH_OBJ);
           return $result;
        }
        
        public function getWinkelCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_winkel_value FROM content_field_soort_winkel
                WHERE field_soort_winkel_value NOT IN('null', '') 
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
         public function getHorecaCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_horeca_value FROM content_type_plaats
                WHERE field_soort_horeca_value NOT IN('null', '') 
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
         public function getOverDeStadCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_over_de_stad_value FROM content_type_plaats
                WHERE field_soort_over_de_stad_value NOT IN('null', '') 
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
         public function getCultuurCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_cultuur_value FROM content_type_plaats
                WHERE field_soort_cultuur_value NOT IN('null', '') ORDER BY field_soort_cultuur_value ASC
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
         public function getUitgaanCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_uitgaan_value FROM content_type_plaats
                WHERE field_soort_uitgaan_value NOT IN('null', '') 
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
        public function getVrijeTijdCategories(){
            $query = $this->DB->prepare("
               SELECT DISTINCT field_soort_vrije_tijd_value FROM content_type_plaats
                WHERE field_soort_vrije_tijd_value NOT IN('null', '') 
           ");
           $succes = $query->execute(array());
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_OBJ);
           return $result;
        }
        
        public function getNodesFromHoreca($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_type_plaats
                WHERE field_soort_horeca_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function getNodesFromCultuur($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_type_plaats
                WHERE field_soort_cultuur_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function getNodesFromOverDeStad($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_type_plaats
                WHERE field_soort_over_de_stad_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function getNodesFromWinkel($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_field_soort_winkel
                WHERE field_soort_winkel_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function getNodesFromUitgaan($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_type_plaats
                WHERE field_soort_uitgaan_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function getNodesFromVrijeTijd($subcategory){
           $query = $this->DB->prepare("
               SELECT nid FROM content_type_plaats
                WHERE field_soort_vrije_tijd_value = ? 
           ");
           $succes = $query->execute(array($subcategory));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_COLUMN);
           return $result;
        }
        
        public function checkInHoreca($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_type_plaats ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_horeca_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;;
        }
        
         public function checkInCultuur($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_type_plaats ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_cultuur_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;
        }
        
        public function checkInOverDeStad($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_type_plaats ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_over_de_stad_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;
        }
        
        public function checkInWinkel($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_field_soort_winkel ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_winkel_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;
        }
        
        public function checkInUitgaan($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_type_plaats ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_uitgaan_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;
        }
        
        public function checkInVrijeTijd($nid){
            $query = $this->DB->prepare("
               SELECT ctp.* FROM node n
                    JOIN content_type_plaats ctp ON ctp.nid = n.nid
                    WHERE n.nid = ?
                    AND field_soort_vrije_tijd_value is not null
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           if(empty($result)) return false;
           else return true;
        }
        
        public function getPlaceByNid($nid){
           $query = $this->DB->prepare("
              SELECT n.title, body FROM node n
                    JOIN node_revisions nr ON n.nid = nr.nid
                    WHERE n.nid =?
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetch(\PDO::FETCH_OBJ);
           return $result;
        }
        
        public function getImageByNid($nid){
          $query = $this->DB->prepare("
                                  SELECT f.* FROM image_attach ia
                                    JOIN node n ON n.nid = ia.iid
                                    JOIN image i On i.nid = n.nid
                                    JOIN files f ON f.fid = i.fid
                                    WHERE ia.nid = ?
                                    AND image_size = 'slideshow'
                                    ORDER BY RAND()
                                    LIMIT 1
           ");
           $succes = $query->execute(array($nid));
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetch(\PDO::FETCH_OBJ);
           return $result;
        }
    }
?>
