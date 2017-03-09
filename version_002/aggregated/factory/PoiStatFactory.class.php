<?php
namespace aggregated\factory;

require_once(ROOT . 'aggregated/model/PoiStat.class.php');
require_once(ROOT . 'aggregated/dao/PoiStatDAO.class.php');

class PoiStatFactory extends \core\factory\GenericFactory{
    
    protected $dao;
    
    public function __construct() {
        parent::__construct(new \poi\model\PoiStat());
        $this->dao = new \poi\dao\PoiStatDAO();
    }
    
    public function insertPoiStat($poiStat){
        return $this->dao->insertRecord($poiStat);
    }
    
    public function createPoiStatsBySourceReferencePoiMetricId($sourceReferencePoiMetricId){
        return $this->toArray($this->dao->getBySourceReferencePoiMetricId($sourceReferencePoiMetricId, 'source_reference_poi_metric_id'));
    }
    
    public function createPoiStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to){
		return $this->toArray($this->dao->getPoiStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to));
    }
	
	public function createPoiStatsPastBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to){
        return $this->toArray($this->dao->getPoiStatsPastBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to));
    }
}
?>
