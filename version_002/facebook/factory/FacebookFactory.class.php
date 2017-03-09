<?php
    namespace facebook\factory;
    
    require_once(ROOT . '/core/factory/GenericFactory.class.php');
    require_once(ROOT . '/facebook/factory/FacebookLocationFactory.class.php');
    require_once(ROOT . '/facebook/api/FacebookApi.class.php');
    require_once(ROOT . '/facebook/model/FacebookPlace.class.php');
    require_once(ROOT . '/facebook/model/FacebookLocation.class.php');
    require_once(ROOT . '/facebook/dao/FacebookDAO.class.php');
    
    class FacebookFactory extends \core\factory\GenericFactory {
        protected $api; 
        protected $dao;
        
        public function __construct() {
            parent::__construct(new \facebook\model\FacebookPlace());
            $this->api = new \facebook\api\FacebookApi();
            $this->facebookLocationFactory = new FacebookLocationFactory();
            $this->dao = new \facebook\dao\FacebookDAO();
        } 
        
        public function createPlacesByGeolocation($geolocation, $limit){
            return $this->toArray($this->api->getFacebookPlacesByGeoLocation($geolocation, $geolocation->radius, $limit));
        }
        
        public function getFacebookPlaceBySourceReference($sourceReference){
            // var_dump($sourceReference);
            return $this->api->getFacebookPlaceById($sourceReference);
        }
        
        protected function customFillProperty($property, $data, &$object) {
           switch($property){
                case 'location':
                    if(isset($data['location']))
                    return $this->facebookLocationFactory->toObject($data['location']);
                    else return $this->facebookLocationFactory->toObject(null);
                    break;
                default: return $object->$property;
            }
        }
    }
?>
