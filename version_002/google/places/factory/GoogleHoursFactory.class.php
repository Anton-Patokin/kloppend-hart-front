<?php

namespace google\places\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'google/places/dao/GoogleHoursDao.class.php');
require_once(ROOT . 'google/places/model/GoogleHours.class.php');

class GoogleHoursFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	public function __construct(){
		parent::__construct(new \google\places\model\GoogleHours());
		$this->dao = new \google\places\dao\GoogleHoursDao();
	}
	
	public function saveGoogleHours($googleHours){
		 if($this->checkHoursExists($googleHours)){
			$this->dao->updateRecordByPrimaryKey($googleHours, array($googleHours->source_reference_id, $googleHours->place_day, $googleHours->times_opened),   array('source_reference_id', 'place_day', 'times_opened'));
		}else{
			$this->dao->insertRecord($googleHours);
		}
	}

	public function getGoogleHoursByNid($nid){
	 	return $this->dao->getGoogleHoursByNid($nid);
	}
	
	
	private function checkHoursExists($googleHours){
		$match = $this->dao->getByPrimaryKey(
			array($googleHours->source_reference_id, $googleHours->place_day, $googleHours->times_opened),
			array('source_reference_id', 'place_day', 'times_opened'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
