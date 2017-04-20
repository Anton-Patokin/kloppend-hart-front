<?php

namespace google\places\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'google/places/dao/GoogleRatingDao.class.php');
require_once(ROOT . 'google/places/model/GoogleRating.class.php');

class GoogleRatingFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	public function __construct(){
		parent::__construct(new \google\places\model\GoogleRating());
		$this->dao = new \google\places\dao\GoogleRatingDao();
	}
	
	public function saveGoogleRating($googleRating){
		 if($this->checkRatingExists($googleRating)){
			$this->dao->updateRecordByPrimaryKey($googleRating, array($googleRating->source_reference_id),   array('source_reference_id'));
		}else{
			$this->dao->insertRecord($googleRating);
		}
	}

	public function getGoogleRatingByNid($nid){
	 	return $this->dao->getGoogleRatingByNid($nid);
	}
	
	
	private function checkRatingExists($googleRating){
		$match = $this->dao->getByPrimaryKey(
			array($googleRating->source_reference_id),
			array('source_reference_id'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
