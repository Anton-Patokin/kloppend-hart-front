<?php

namespace aggregated\service;

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');
require_once (ROOT . 'aggregated/factory/PoiAvgHourWeekDayFactory.class.php');

class PoiAvgHourWeekDayService{
    
        protected $PoiAvgHourWeekDayFactory;
    
        public function __construct()
        {
            $this->PoiAvgHourWeekDayFactory= new \aggregated\factory\PoiAvgHourWeekDayFactory();
        }

	public function calculateAvgHourWeekDayBySourceReferencePoiMetricId($sourceReferencePoiMetricId) {
            $this->PoiAvgHourWeekDayFactory->calculateAvgHourWeekDayBySourceReferencePoiMetricId($sourceReferencePoiMetricId);
        }
        
        public function calculateAvgHourWeekDayBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId) {
            $this->PoiAvgHourWeekDayFactory->calculateAvgHourWeekDayBySourceReferencePoiMetricIdRange($fromSourceReferencePoiMetricId, $toSourceReferencePoiMetricId);
        }
}
?>