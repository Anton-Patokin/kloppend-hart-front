<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');
    require_once (ROOT . 'source/model/SourceReference.class.php');
    require_once (ROOT . 'source/dao/SourceReferenceDAO.class.php');
    
    class SourceReferenceFactory extends \core\factory\GenericFactory {
        
        
        public function __construct() {
            parent::__construct(new \source\model\SourceReference());
            $this->dao = new \source\dao\SourceReferenceDAO();
        }
        
        public function saveSourceReference($sourceReference){
            if($this->checkSourceReferenceExists($sourceReference))                
               return $this->dao->updateRecordByPrimaryKey($sourceReference, array($sourceReference->source_reference_id));
            else
               return $this->dao->insertRecord($sourceReference);
        }
        
        public function updateSourceReference($sourceReference){
            return $this->dao->updateRecordByPrimaryKey($sourceReference, array($sourceReference->source_reference_id));
        }
        
        private function checkSourceReferenceExists($sourceReference){
            $match = $this->dao->getByPrimaryKey(
                       array($sourceReference->source_reference, $sourceReference->source_id),
                       array('source_reference', 'source_id')
                   );
            if(empty($match)) return false;
            return true;
        }
        
        public function getSourceReferenceById($sourceReferenceId){
            return $this->toObject($this->dao->getByid($sourceReferenceId, 'source_reference_id'));
        }
        
        public function getSourceReferenceByReference($sourceReference, $sourceId){
            return $this->toObject($this->dao->getSourceReferenceByReference($sourceReference, $sourceId));
        }
        
        public function createSourceReferencesBySourceId($sourceId){
            return $this->toArray($this->dao->getSourceReferencesBySourceId($sourceId));
        }
        
        public function createLinkedSourceReferencesBySourceId($sourceId){
            //var_dump($this->toArray($this->dao->getLinkedSourceReferencesBySourceId($sourceId)));
            return $this->toArray($this->dao->getLinkedSourceReferencesBySourceId($sourceId));
        }
        
        public function createUnlinkedSourceReferencesBySourceId($sourceId, $cityId, $limit){
            return $this->toArray($this->dao->getUnlinkedSourceReferencesBySourceId($sourceId, 0,$limit));
        }
        
        public function createSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId){
            return $this->toArray($this->dao->getSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId));
        }
        
        public function createLinkedSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId){
            return $this->toArray($this->dao->getLinkedSourceReferencesByRange($sourceId, $fromSourceReferenceId, $toSourceReferenceId));
        }
        
        public function getExistingSourceReferencesBySourceId($sourceId, $sourceRerences){
            return $this->dao->getExistingSourceReferences($sourceId, $sourceRerences);
        }
        
        public function updateSourceReferenceBySourceId($sourceReference){
            return $this->dao->updateSourceReferenceBySourceId($sourceReference);
        }
        
        public function getTotalFetchedSince($sinceDate){
            return $this->dao->getTotalFetchedSince($sinceDate);
        }

        public function getLastFetched(){
            return $this->toObject($this->dao->getLastFetched());
        }
    }
?>
