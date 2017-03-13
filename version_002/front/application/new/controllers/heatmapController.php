<?php

	require_once(ROOT_FRONT . '/application/models/facebookModel.php');
	require_once(ROOT_FRONT . '/application/models/foursquareModel.php');
	require_once(ROOT_FRONT . '/application/models/apenModel.php');

	/**
	* 
	*/
	class heatmapController
	{

		protected $facebookModel;
	    protected $foursquareModel;
	    protected $apenModel;
		
		function __construct()
		{
			$this->facebookModel = new facebookModel();
	        $this->foursquareModel = new foursquareModel();
	        $this->apenModel = new apenModel();
		}

		public function getMetricsByTimeRange($startDate, $endDate){
	        $metrics = array();
	        $metrics['facebook'] = $this->getFacebookMetricsByTimeRange($startDate, $endDate);
	        $metrics['foursquare'] = $this->getFoursquareMetricsByTimeRange($startDate, $endDate);
	        $metrics['apen'] = $this->getApenMetricsByTimeRange($startDate, $endDate);
	        return json_encode($metrics);
	    }

	    private function getFoursquareMetricsByTimeRange($startDate, $endDate){
	        $metrics = array();
	        
	        $metrics['checkin'] = $this->foursquareModel->getFoursquareMetricByNameByTimeRange('checkin', $startDate, $endDate);
	        $metrics['user']    = $this->foursquareModel->getFoursquareMetricByNameByTimeRange('user', $startDate, $endDate);
	        
	        return $metrics;
	    }
	    
	    private function getFacebookMetricsByTimeRange($startDate, $endDate){
	        $metrics = array();
	        
	        //3 queries atm -> can be reduces to 1 of performance issues rise
	        $metrics['like']          = $this->facebookModel->getFacebookMetricByNameByTimeRange('like', $startDate, $endDate);
	        $metrics['checkin']       = $this->facebookModel->getFacebookMetricByNameByTimeRange('checkin', $startDate, $endDate);
	        $metrics['talking_about'] = $this->facebookModel->getFacebookMetricByNameByTimeRange('talking_about', $startDate, $endDate);
	        
	        return $metrics;
	    }
	    
	    private function getApenMetricsByTimeRange($startDate, $endDate){
	        $metrics = array();
	        
	        $metrics['visit'] = $this->apenModel->getApenMetricByNameByTimeRange('visit', $startDate, $endDate);
	        
	        return $metrics;
	    }
	}

?>