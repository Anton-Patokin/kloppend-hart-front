<?php

namespace yelp\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'yelp/dao/YelpRatingDao.class.php');
require_once(ROOT . 'yelp/model/YelpRating.class.php');

class YelpRatingFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	protected $userFactory;
	
	public function __construct(){
		parent::__construct(new \yelp\model\YelpRating());
		$this->dao = new \yelp\dao\YelpRatingDao();
	}
	
	public function saveYelpRating($yelpRating){
		 if($this->checkRatingExists($yelpRating)){
			$this->dao->updateRecordByPrimaryKey($yelpRating, array($yelpRating->source_reference_id),   array('source_reference_id'));
		}else{
			$this->dao->insertRecord($yelpRating);
		}
	}

	public function getYelpRatingByNid($nid){
	 	return $this->dao->getYelpRatingByNid($nid);
	}	
	
	private function checkRatingExists($yelpRating){
		$match = $this->dao->getByPrimaryKey(
			array($yelpRating->source_reference_id),
			array('source_reference_id'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
