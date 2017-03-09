<?php
namespace aggregated\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'aggregated/model/PoiAvgHourWeekDay.class.php');
require_once(ROOT . 'aggregated/dao/PoiAvgHourWeekDayDAO.class.php');
require_once(ROOT . 'aggregated/factory/PoiStatsTimeAggregatedFactory.class.php');
require_once(ROOT . 'source/factory/SourceReferencePoiMetricFactory.class.php');

class PoiAvgHourWeekDayFactory extends \core\factory\GenericFactory{
    
    protected $dao;
    
    protected $poiStatsTimeAggregatedFactory;
    protected $sourceReferencePoiMetricFactory;
    
    protected $days = array(
        1 => 'maandag',
        2 => 'dinsdag',
        3 => 'woensdag',
        4 => 'donderdag',
        5 => 'vrijdag',
        6 => 'zaterdag',
        7 => 'zondag'
    );
    
    protected $avgRange = 30; //in days
    protected $calculate_time = 1440;//in minutes
    
    
    
    public function __construct() {
        parent::__construct(new \aggregated\model\PoiAvgHourWeekDay());
        $this->dao = new \aggregated\dao\PoiAvgHourWeekDayDAO();
        $this->poiStatsTimeAggregatedFactory = new \aggregated\factory\PoiStatsTimeAggregatedFactory();
        $this->sourceReferencePoiMetricFactory = new \source\factory\SourceReferencePoiMetricFactory();
        $this->calculate_time = $this->calculate_time * 60;
        $this->avgRange = $this->avgRange * 24 * 60 * 60;
    }
    
    
    //needs to take last calculated into account? 
    public function calculateAvgHourWeekDayBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId){
        $sourceReferencePoiMetrics = $this->sourceReferencePoiMetricFactory->getSourceReferencePoiMetricsInRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId);
        foreach($sourceReferencePoiMetrics as $sourceReferencePoiMetric){
            $this->calculateAvgHourWeekDayBySourceReferencePoiMetricId($sourceReferencePoiMetric->source_reference_poi_metric_id);
        }
    }
    
    public function calculateAvgHourWeekDayBySourceReferencePoiMetricId($sourceReferencePoiMetricId){
       $week = $this->generateWeek();
       
       foreach($week as $day){
          $weekday = array_search($day['day'], $this->days);
          $i = 0;
          foreach($day['hours'] as $hour){
              
              $date = date('Y-m-d');
              $datePast = date('Y-m-d', time() - $this->avgRange);
              
              if($i == 23) $next = 0;
              else $next = $i + 1;
              
              $avg = $this->poiStatsTimeAggregatedFactory->getAvgPoiStatsTimeBySourceReferencePoiMetricIdByWeekDayByTimeRange($sourceReferencePoiMetricId, $weekday, $datePast.' '.$day['hours'][$i], $date.' '.$day['hours'][$next]);
              
              if($avg->avg != null){
                  $poiAvgHourWeekDay = new \aggregated\model\PoiAvgHourWeekDay();
                  $poiAvgHourWeekDay->hour = $i;
                  $poiAvgHourWeekDay->average = $avg->avg;
                  $poiAvgHourWeekDay->week_day     = $weekday;
                  $poiAvgHourWeekDay->last_calculated = date('Y-m-d H:i:s');
                  $poiAvgHourWeekDay->source_reference_poi_metric_id = $sourceReferencePoiMetricId;
                  
                  //insert or save(to keep average history) ?
                  $this->dao->insertRecord($poiAvgHourWeekDay);
              }
              $i++;
          }
       }
       
    }
    
    private function generateWeek(){
        $week = array();
        for($i = 1; $i < 8; $i++){
            $week[$i]['day'] = $this->days[$i];
            for($j = 0; $j < 24; $j++){
                if($j < 10){
                    $week[$i]['hours'][$j] = '0'.$j.':00:00';
                }else{
                    $week[$i]['hours'][$j] = $j . ':00:00';
                }
            }
        }
        return $week;
    }
}
?>
