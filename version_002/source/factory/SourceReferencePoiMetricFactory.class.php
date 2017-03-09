<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');  
    require_once (ROOT . 'source/model/SourceReferencePoiMetric.class.php');
    require_once (ROOT . 'source/dao/SourceReferencePoiMetricDAO.class.php');
    
    class SourceReferencePoiMetricFactory extends \core\factory\GenericFactory{
        
        public function __construct() {
            parent::__construct(new \source\model\SourceReferencePoiMetric());
            $this->dao = new \source\dao\SourceReferencePoiMetricDAO();
        }
        
        public function getById($sourceReferencePoiMetricId){
           return $this->toObject($this->dao->getById($sourceReferencePoiMetricId));
        }
       
        public function getSourceReferencePoiMetricsInRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId){
           return $this->toArray($this->dao->getSourceReferencePoiMetricsInRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId));
        }
        
        public function getNextSourceReferencePoiMetrics($batchSize, $batchOffset){
            return $this->toArray($this->dao->getNextSourceReferencePoiMetrics($batchSize, $batchOffset));
        }
        
         public function getSourceReferencePoiMetricSourceMetricBySourceReferencePoiId($sourceReferencePoiId){
            return $this->dao->getSourceReferencePoiMetricSourceMetricBySourceReferencePoiId($sourceReferencePoiId);
        }
        
        public function saveSourceReferencePoiMetric($sourceReferencePoiMetric){
            if($this->checkSourceReferencePoiMetricExists($sourceReferencePoiMetric)){
                //$this->dao->updateRecordByPrimaryKey($sourceReferencePoiMetric, array($sourceReferencePoiMetric->source_reference_poi_id, $sourceReferencePoiMetric->metric_id), array('source_reference_poi_id', 'metric_id'));
            }else{
                $this->dao->insertRecord($sourceReferencePoiMetric);
            }
        }
        
        public function updateLastAggregatedById($sourceReferencePoiMetricId){
            $this->dao->updateLastAggregatedById($sourceReferencePoiMetricId);
        }
        
        public function updateSourceReferencePoiMetricLastFetched($poiStat){
            $this->dao->updateLastFetchedById($poiStat->source_reference_poi_metric_id, date('Y-m-d H:i:s'));
        }
        
        public function createSourceReferencePoiMetricsByNidBySourceId($nid, $sourceId){
            return $this->toArray($this->dao->getSourceReferencePoiMetricsByNidBySourceId($nid, $sourceId));
        }
        
        private function checkSourceReferencePoiMetricExists($sourceReferencePoiMetric){
            $match = $this->dao->getByPrimaryKey(
                    array($sourceReferencePoiMetric->source_reference_poi_id, $sourceReferencePoiMetric->metric_id),
                    array('source_reference_poi_id', 'metric_id'));
            if(empty($match)) return false;
            return true;
        }
    }
?>
