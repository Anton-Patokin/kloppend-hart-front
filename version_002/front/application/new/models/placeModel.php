<?php

	require_once(ROOT . 'poi/service/PoiService.class.php');

	/**
	* 
	*/
	class placeModel
	{
		protected $poiService;
		
		function __construct()
		{
			$this->poiService = new \poi\service\PoiService();
		}

		public function getTopPlacesByCategory($category, $subcategory){
	        $startDate = date('Y-m-d 00:00:00', time());
	        $endDate   = date('Y-m-d 00:00:00', time() + 86400);
	        return $this->poiService->getTopPlacesByCategory($category, $subcategory, $startDate, $endDate);
	    }
	}

?>