<?php
namespace aggregated\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'aggregated/factory/PoiStatFactory.class.php');
require_once(ROOT . 'source/factory/SourceReferencePoiMetricFactory.class.php');
require_once(ROOT . 'source/factory/SourceReferencePoiFactory.class.php');
require_once(ROOT . 'source/factory/SourceFactory.class.php');
require_once(ROOT . 'poi/factory/PoiFactory.class.php');
require_once(ROOT . 'source/factory/SourceMetricFactory.class.php');
require_once(ROOT . 'aggregated/model/PoiStatsTimeAggregated.class.php');
require_once(ROOT . 'aggregated/dao/PoiStatsTimeAggregatedDAO.class.php');

class PoiStatsTimeAggregatedFactory extends \core\factory\GenericFactory{
    
    protected $dao;
    
    protected $poiStatFactory;
    protected $sourceReferencePoiMetricFactory;
    protected $sourceReferencePoiFactory;
    protected $sourceFactory;
    protected $sourceMetricFactory;
    protected $poiFactory;
    
    protected $timeInterval = 30; //in minutes
    
    public function __construct() {
        parent::__construct(new \aggregated\model\PoiStatsTimeAggregated());
        $this->dao = new \aggregated\dao\PoiStatsTimeAggregatedDAO();
        $this->poiStatFactory = new \aggregated\factory\PoiStatFactory();
        $this->poiFactory = new \poi\factory\PoiFactory();
        $this->sourceReferencePoiMetricFactory = new \source\factory\SourceReferencePoiMetricFactory();
        $this->sourceReferencePoiFactory = new \source\factory\SourceReferencePoiFactory();
        $this->sourceMetricFactory = new \source\factory\SourceMetricFactory();
        $this->sourceFactory = new \source\factory\SourceFactory();
        $this->timeInterval = $this->timeInterval * 60;
    }
    
    public function setTimeInterval($timeInterval){
        $this->timeInterval = $timeInterval * 60;
    }
    
    public function getAggregatedPoiStatsTimeByMetricBySourceByTimRange($metric, $source, $startDate, $endDate){
        $sourceId = $this->sourceFactory->createSourceByName($source)->source_id;
        return $this->dao->getAggregatedPoiStatsTimeByMetricBySourceByTimeRange($metric, $sourceId, $startDate, $endDate);
    }
    
    public function getPositionsByNid($nid, $startDate, $endDate){
        return $this->dao->getPositionsByNid($nid, $startDate, $endDate);
    }
    
    public function checkTimeRangeExists($sourceReferencePoiMetricId, $from, $to)
    {
        $match = $this->dao->getByPrimaryKey(
                array($sourceReferencePoiMetricId, $from, $to), 
                array('source_reference_poi_metric_id', 'from_time', 'to_time')
               );
        if(!$match) return false;
        return true;
    }
    
    public function insertPoiStatsTimeAggregated($poiStatsTimeAggregated){
        $this->dao->insertRecord($poiStatsTimeAggregated);
    }
    
    public function getTrendingList($lat, $lng, $startDate, $endDate, $source){
        $nearByPois = $this->poiFactory->getNearbyTrendingPoisByGeocode($lat, $lng, $startDate, $endDate, $source);
        return $nearByPois;
    }
    
    public function getPlaceTotalMetricsByNid($nid){
        return $this->dao->getPlaceTotalMetricsByNid($nid);
    }
    
    public function getTopTrendingList($startDate, $endDate, $source){
        $pois = $this->poiFactory->getTopTrendingPois($startDate, $endDate, $source);
        return $pois;
    }
    
    public function updatePoiStatsTimeAggregated($poiStatsTimeAggregated){
        $this->dao->updateRecordByPrimaryKey($poiStatsTimeAggregated, 
                array($poiStatsTimeAggregated->source_reference_poi_metric_id, 
                    $poiStatsTimeAggregated->from_time, 
                    $poiStatsTimeAggregated->to_time),
                array('source_reference_poi_metric_id',
                    'from_time',
                    'to_time')
                );
    }
    
    public function getAvgPoiStatsTimeBySourceReferencePoiMetricIdByWeekDayByTimeRange($sourceReferencePoiMetricId, $weekday, $from, $to){
       return $this->dao->getAvgPoiStatsTimeBySourceReferencePoiMetricIdByWeekDayByTimeRange($sourceReferencePoiMetricId, $weekday, $from, $to);
    }
    
    //aggregate poi stats by range
    public function aggregatePoiStatsTimeBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId){
        $sourceReferencePoiMetrics = $this->sourceReferencePoiMetricFactory->getSourceReferencePoiMetricsInRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId);
        foreach($sourceReferencePoiMetrics as $sourceReferencePoiMetric){
            $this->aggregatePoiStatsTimeBySourceReferencePoiMetric($sourceReferencePoiMetric);
        }
    }
    
    //aggrgate poi stats according to last_aggregated 
    public function aggregateNextPoiStatsTime($batchSize, $intervals = null, $batchOffset = 0) {
        $sourceReferencePoiMetrics = $this->sourceReferencePoiMetricFactory->getNextSourceReferencePoiMetrics($batchSize, $batchOffset);
        foreach($sourceReferencePoiMetrics as $sourceReferencePoiMetric){
            $this->aggregatePoiStatsTimeBySourceReferencePoiMetric($sourceReferencePoiMetric,$intervals);
            //update each poiMetric individually. TODO: If too demanding, update all together.
            $this->sourceReferencePoiMetricFactory->updateLastAggregatedById($sourceReferencePoiMetric->source_reference_poi_metric_id);
        }
    }
    
    public function getStatsBySourceNameByNidByTimeRange($sourceName, $nid, $startDate, $endDate){
        $source = $this->sourceFactory->createSourceByName($sourceName);
        $sourceReferencePoiMetrics = $this->sourceReferencePoiMetricFactory->createSourceReferencePoiMetricsByNidBySourceId($nid, $source->source_id);
   
        $stats = array();
        foreach($sourceReferencePoiMetrics as $sourceReferencePoiMetric){
            $stats = array_merge($stats, $this->dao->getStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetric->source_reference_poi_metric_id, $startDate, $endDate));
        }
        
        $results = array();
        foreach($stats as $stat) {
            $index = $this->date_exists($stat->date, $results);
            if ($index < 0) {
                $results[] = $stat;
            }
            else {
                $results[$index]->total_value +=  $stat->total_value;
            }
        }
        return $results; 
    }
    
    private function date_exists($statDate, $stats){
            $result = -1;
            for($i=0; $i<sizeof($stats); $i++) {
                if ($stats[$i]->date== $statDate) {
                    $result = $i;
                    break;
                }
            }
            return $result;
   }
    
     //aggregate poi Stats
    public function aggregatePoiStatsTimeBySourceReferencePoiMetric($sourceReferencePoiMetric, $intervals = null){
        //date can be made dynamic
        $timeIntervals = $this->calculateTimeIntervals(date('Y-m-d')); 
        
        //$intervals indicate the number of intervals you want to aggregate, starting from the last
        if(!empty($intervals) && is_numeric($intervals)){
            $timeIntervals = array_slice($timeIntervals, count($timeIntervals) - $intervals);

        }
        
       while(count($timeIntervals) > 1){

               //get stats between this range
               $poiStatNow = $this->getTimeRangePoiStats($sourceReferencePoiMetric->source_reference_poi_metric_id, $timeIntervals[0], $timeIntervals[1]);
               $poiStatPast = $this->getTimeRangePoiStatsPast($sourceReferencePoiMetric->source_reference_poi_metric_id, $timeIntervals[0], $timeIntervals[1]);
               if(!empty($poiStatNow)){
                   //create poiStatsTimeAggregated Object for insertion
                   $poiStatsTimeAggregated = new \aggregated\model\PoiStatsTimeAggregated();
                   $poiStatsTimeAggregated->from_time = $timeIntervals[0];
                   $poiStatsTimeAggregated->to_time   = $timeIntervals[1];
                   $poiStatsTimeAggregated->source_reference_poi_metric_id = $sourceReferencePoiMetric->source_reference_poi_metric_id;

                   if(empty($poiStatPast)) $poiStatsTimeAggregated->differential_value = 0;
                   else $poiStatsTimeAggregated->differential_value = $poiStatNow[0]->number - $poiStatPast[0]->number;

                   $poiStatsTimeAggregated->metric_id = $sourceReferencePoiMetric->metric_id;
                   $poiStatsTimeAggregated->poi_id = $this->sourceReferencePoiFactory->getById($sourceReferencePoiMetric->source_reference_poi_id)->poi_id;
                   $poiStatsTimeAggregated->total_value = $poiStatNow[0]->number;

                    //check if timerange allready has been aggregated
                    //provide update if timerange exists
                    if(!$this->checkTimeRangeExists($sourceReferencePoiMetric->source_reference_poi_metric_id, $timeIntervals[0], $timeIntervals[1])){
                        //insert object
                        // echo 'unique: '. $sourceReferencePoiMetric->source_reference_poi_metric_id .' ----- '. $timeIntervals[0] .' ----- '. $timeIntervals[1] .' <br>';
                        $this->insertPoiStatsTimeAggregated($poiStatsTimeAggregated); 
                    }else{
                                                    //update?
                        //$this->updatePoiStatsTimeAggregated($poiStatsTimeAggregated);
                        // echo 'not unique: '. $sourceReferencePoiMetric->source_reference_poi_metric_id .' ----- '. $timeIntervals[0] .' ----- '. $timeIntervals[1] .' <br>';
                    }
               }else{
                //no stats? -> get previous stats or 0 for inital value
               }
           //remove first element from array
           array_shift($timeIntervals);
       }
           
    }
    
    private function calculateTimeIntervals($date){
        $timeIntervals = array();
        //start from midnight
        $date= date('Y-m-d 00:00:00', strtotime($date));
        //add first value
        $timeIntervals[] = $date;
        
        //calculate the steps for our current timeInterval
        $day = 24 * 60 * 60;
        $interval = $day / $this->timeInterval;
        for($i=0; $i < $interval; $i++){
            $date = date('Y-m-d H:i:s', strtotime($date) + ($this->timeInterval));
            $timeIntervals[] = $date;
        }
        return $timeIntervals;
    }
    
    
    
    private function getTimeRangePoiStats($sourceReferencePoiMetricId, $from, $to)
    {
      return $this->poiStatFactory->createPoiStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to);
    }
    
    private function getTimeRangePoiStatsPast($sourceReferencePoiMetricId, $from, $to)
    {
      return $this->poiStatFactory->createPoiStatsPastBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $from, $to);
    }

    
}
?>
