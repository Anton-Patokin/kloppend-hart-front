<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');  
    require_once (ROOT . 'source/model/SourceCityGeolocation.class.php');
    require_once (ROOT . 'source/dao/SourceCityGeolocationDAO.class.php');
    
    class SourceCityGeolocationFactory extends \core\factory\GenericFactory{
        
        public function __construct() {
            parent::__construct(new \source\model\SourceCityGeolocation());
            $this->dao = new \source\dao\SourceCityGeolocationDao();
        }
        
        public function saveSourceCityGeolocation($SourceCityGeolocation){
            if($this->checkSourceCityGeolocationExists($SourceCityGeolocation)){
                $this->dao->updateRecordByPrimaryKey($SourceCityGeolocation, array($SourceCityGeolocation->source_id, $SourceCityGeolocation->city_id, $SourceCityGeolocation->longitude, $SourceCityGeolocation->latitude),  array('source_id', 'city_id', 'longitude', 'latitude'));
            }else{
                $this->dao->insertRecord($SourceCityGeolocation);
            }
        }
        
        public function createSourceCityGeolocationsBySourceId($source_id, $limit){
            return $this->toArray($this->dao->getSourceCityGeolocationsBySourceId($source_id, $limit));
        }
        
        private function checkSourceCityGeolocationExists($SourceCityGeolocation){
           $match = $this->dao->getByPrimaryKey(
                       array($SourceCityGeolocation->source_id, $SourceCityGeolocation->city_id, $SourceCityGeolocation->longitude, $SourceCityGeolocation->latitude),
                       array('source_id', 'city_id', 'longitude', 'latitude')
                   );
            if(empty($match)) return false;
            return true;
        }
    }
?>
