<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');
    require_once (ROOT . 'source/model/SourceReferencePoiMatch.class.php');
    require_once (ROOT . 'source/dao/SourceReferencePoiMatchDAO.class.php');
    require_once (ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
    
    class SourceReferencePoiMatchFactory extends \core\factory\GenericFactory {
        
        protected $dao;
        protected $sourceReferencePoiFactory;
        
        public function __construct() {
            parent::__construct(new \source\model\SourceReferencePoiMatch());
            $this->dao = new \source\dao\SourceReferencePoiMatchDAO();
            $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        }
        
        public function getMatches($sourceId = null, $includeFlaggedMatch = true){
            //result is not modelled
            return $this->dao->getMatches($sourceId, $includeFlaggedMatch);
        }
        
        public function markAsMatch($sourceReferenceId, $poiId){
            $obj = new \stdClass();
            $obj->is_match = true;
            return $this->dao->updateRecordByPrimaryKey($obj, array($sourceReferenceId, $poiId));
        }

        public function markAsNoMatch($sourceReferenceId, $poiId){
           $obj = new \stdClass();
            $obj->is_match = false;
            return $this->dao->updateRecordByPrimaryKey($obj, array($sourceReferenceId, $poiId));
        }
        
        public function getMatchesBySourceId($sourceId, $includeFlaggedMatch = true){
            return parent::toArray($this->dao->getMatchesBySourceId($sourceId, $includeFlaggedMatch));
        }
        
        public function convertMatchesToSourceReferencePois(){
           $this->dao->convertMatchesToSourceReferencePois();
           //special case for apen
           $this->dao->convertApenSourceReferencesToSourceReferencePois(3);
        }
        
        public function convertSourceReferencePoisToSourceReferencePoiMetrics(){
            $this->dao->convertSourceReferencePoisToSourceReferencePoiMetrics();
        }
        
        public function saveSourceReferencePoiMatch($sourceReferencePoiMatch){
            if(!$this->checkMatchExist($sourceReferencePoiMatch)) 
                return $this->dao->insertRecord($sourceReferencePoiMatch);
            else
                $this->dao->updateRecordByPrimaryKey($sourceReferencePoiMatch, array($sourceReferencePoiMatch->source_reference_id,
                                                                                     $sourceReferencePoiMatch->poi_id));
        }
        
        public function checkMatchExist($sourceReference){
             $match = $this->dao->getByPrimaryKey(
                    array($sourceReference->source_reference_id, $sourceReference->poi_id),
                    array('source_reference_id', 'poi_id'));
            if(empty($match)) return false;
            return true;
        }
        
        private function hasBeenMatched($sourceReferencePoiMatch){
            $match = $this->dao->getByPrimaryKey(
                    array($sourceReferencePoiMatch->source_reference_id, $sourceReferencePoiMatch->poi_id, $sourceReferencePoiMatch->match_score),
                    array('source_reference_id', 'poi_id', 'match_score'));
            if(empty($match)) return false;
            return true;
        }
    }

?>
