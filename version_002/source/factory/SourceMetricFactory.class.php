<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');    
    require_once (ROOT . 'source/model/SourceMetric.class.php');
    require_once (ROOT . 'source/dao/SourceMetricDAO.class.php');
    
    class SourceMetricFactory extends \core\factory\GenericFactory{
        
        public function __construct() {
            parent::__construct(new \source\model\SourceMetric());
            $this->dao = new \source\dao\SourceMetricDAO();
        }
        
        public function getById($metricId){
            return $this->toObject($this->dao->getById($metricId));
        }
        
        public function createSourceMetricsBySourceId($sourceId){
            return $this->toArray($this->dao->getSourceMetricsBySourceId($sourceId));
        }
        
        public function createSourceMetricByMetricNameBySourceId($metricName, $sourceId){
            return $this->toObject($this->dao->getSourceMetricByMetricNameBySourceId($metricName, $sourceId));
        }
    }
?>
