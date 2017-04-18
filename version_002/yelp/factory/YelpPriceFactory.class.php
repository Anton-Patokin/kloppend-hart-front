<?php

namespace yelp\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'yelp/dao/YelpPriceDao.class.php');
require_once(ROOT . 'yelp/model/YelpPrice.class.php');

class YelpPriceFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	public function __construct(){
		parent::__construct(new \yelp\model\YelpPrice());
		$this->dao = new \yelp\dao\YelpPriceDao();
	}
	
	public function saveYelpPrice($yelpPrice){
		 if($this->checkPriceExists($yelpPrice)){
			$this->dao->updateRecordByPrimaryKey($yelpPrice, array($yelpPrice->source_reference_id),   array('source_reference_id'));
		}else{
			$this->dao->insertRecord($yelpPrice);
		}
	}

	public function getYelpPriceByNid($nid){
	 	return $this->dao->getYelpPriceByNid($nid);
	}
	
	
	private function checkPriceExists($yelpPrice){
		$match = $this->dao->getByPrimaryKey(
			array($yelpPrice->source_reference_id),
			array('source_reference_id'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
