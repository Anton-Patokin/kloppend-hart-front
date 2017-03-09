<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');
    require_once (ROOT . 'source/model/SourceReferencePoi.class.php');
    require_once (ROOT . 'source/dao/SourceReferencePoiDAO.class.php');
    class SourceReferencePoiFactory extends \core\factory\GenericFactory {
        
        protected $dao;
        
        public function __construct() {
            parent::__construct(new \source\model\SourceReferencePoi());
            $this->dao = new \source\dao\SourceReferencePoiDAO();
        }
        
        public function insertRecords($records){
           return $this->dao->insertRecords($records);
        }
        
        public function getById($sourceReferencePoiId){
            return $this->toObject($this->dao->getById($sourceReferencePoiId));
        }
        
        public function saveSourceReferencePoi($sourceReferencePoi){
            if(empty($sourceReferencePoi->source_reference_poi_id) || empty($sourceReferencePoi->source_reference_poi_id) == 0) 
                return $this->dao->insertRecord($sourceReferencePoi);
            return $this->dao->updateRecordById($sourceReferencePoi, $sourceReferencePoi->source_reference_poi_id);
        }
        
        public function getSourceReferencePoiById($sourceReferencePoiId){
            return $this->toObject($this->dao->getById($sourceReferencePoiId, 'source_reference_poi_id'));
        }
        
        public function getSourceReferencePoisByPoiId($poiId, $sourceId){
            return $this->toArray($this->dao->getSourceReferencePoisByPoiId($poiId, $sourceId));
        }
        
        public function getSourceReferencePoiIdsBySourceIdBatch($from, $batchSize, $sourceId){
            return $this->dao->getSourceReferencePoiIdsBySourceIdBatch($from, $batchSize, $sourceId);
        }
        
       
    }
?>
