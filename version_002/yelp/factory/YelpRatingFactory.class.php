<?php

namespace yelp\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'yelp/dao/YelpRatingDao.class.php');
require_once(ROOT . 'yelp/factory/YelpLocationFactory.class.php');
require_once(ROOT . 'yelp/model/YelpRating.class.php');

class YelpRatingFactory extends \core\factory\GenericFactory{
	protected $api;
	protected $dao;
	
	protected $userFactory;
	
	public function __construct(){
		parent::__construct(new \yelp\model\YelpRating());
		$this->dao = new \yelp\dao\YelpRatingDao();
		$this->api = new \yelp\api\YelpApi();
		$this->locationFactory = new \yelp\factory\YelpLocationFactory();
	}
	
	public function saveYelpRating($yelpRating){
		 if($this->checkRatingExists($yelpRating)){
			$this->dao->updateRecordByPrimaryKey($yelpRating, array($yelpRating->source_reference_id, $yelpRating->business_rating),   array('source_reference_id', 'business_rating'));
		}else{
			$this->dao->insertRecord($yelpRating);
		}
	}

	public function getYelpRatingByNid($nid){
	 	return $this->dao->getYelpRatingByNid($nid);
	}
	
   //  protected function customFillProperty($property, $data, &$object) {
   //       switch($property){
   //          case 'rating':
   //              return  var_dump($data);  //$this->locationFactory->toObject($data);
   //              break;
   //         default:
   //             return $object->$property;
   //      }
   // }
	
	
	private function checkRatingExists($yelpRating){
		$match = $this->dao->getByPrimaryKey(
			array($yelpRating->source_reference_id, $yelpRating->business_rating),
			array('source_reference_id', 'business_rating'));
		if(empty($match)) return false;
		return true;
	}
	
	
}
?>
