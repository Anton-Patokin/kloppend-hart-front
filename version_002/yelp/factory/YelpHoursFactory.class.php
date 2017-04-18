<?php

namespace yelp\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'yelp/dao/YelpHoursDao.class.php');
require_once(ROOT . 'yelp/factory/YelpLocationFactory.class.php');
require_once(ROOT . 'yelp/model/YelpHours.class.php');

class YelpHoursFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	public function __construct(){
		parent::__construct(new \yelp\model\YelpHours());
		$this->dao = new \yelp\dao\YelpHoursDao();
		$this->api = new \yelp\api\YelpApi();
		$this->locationFactory = new \yelp\factory\YelpLocationFactory();
	}
	
	public function saveYelpHours($yelpHours){
		 if($this->checkHoursExists($yelpHours)){
			$this->dao->updateRecordByPrimaryKey($yelpHours, array($yelpHours->source_reference_id, $yelpHours->business_day),   array('source_reference_id', 'business_day'));
		}else{
			$this->dao->insertRecord($yelpHours);
		}
	}

	public function getYelpHoursByNid($nid){
	 	return $this->dao->getYelpHoursByNid($nid);
	}
	
	
	private function checkHoursExists($yelpHours){
		$match = $this->dao->getByPrimaryKey(
			array($yelpHours->source_reference_id, $yelpHours->business_day),
			array('source_reference_id', 'business_day'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
