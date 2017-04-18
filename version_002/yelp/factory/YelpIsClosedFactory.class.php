<?php

namespace yelp\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'yelp/dao/YelpIsClosedDao.class.php');
require_once(ROOT . 'yelp/factory/YelpLocationFactory.class.php');
require_once(ROOT . 'yelp/model/YelpIsClosed.class.php');

class YelpIsClosedFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	public function __construct(){
		parent::__construct(new \yelp\model\YelpIsClosed());
		$this->dao = new \yelp\dao\YelpIsClosedDao();
		$this->api = new \yelp\api\YelpApi();
		$this->locationFactory = new \yelp\factory\YelpLocationFactory();
	}
	
	public function saveYelpIsClosed($yelpIsClosed){
		 if($this->checkIsClosedExists($yelpIsClosed)){
			$this->dao->updateRecordByPrimaryKey($yelpIsClosed, array($yelpIsClosed->source_reference_id),   array('source_reference_id'));
		}else{
			$this->dao->insertRecord($yelpIsClosed);
		}
	}

	public function getYelpIsClosedByNid($nid){
	 	return $this->dao->getYelpIsClosedByNid($nid);
	}
	
	
	private function checkIsClosedExists($yelpIsClosed){
		$match = $this->dao->getByPrimaryKey(
			array($yelpIsClosed->source_reference_id),
			array('source_reference_id'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
