<?php
    namespace twitter\factory;
    
    require_once(ROOT . '/core/factory/GenericFactory.class.php');
    require_once(ROOT . '/twitter/model/TwitterUser.class.php');
    
    class TwitterUserFactory extends \core\factory\GenericFactory {
        protected $api; 
        public function __construct() {
            parent::__construct(new \twitter\model\TwitterUser());
        }
        
         protected function customFillProperty($property, $data, &$object) {
           switch($property){
                case 'creation_date':
                    if(isset($data->createdAt))
                    return $data->createdAt;
                    break;
                default: return $object->$property;
            }
        }
    }
?>
