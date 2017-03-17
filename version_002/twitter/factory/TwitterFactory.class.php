<?php
    namespace twitter\factory;
    
    require_once(ROOT . '/core/factory/GenericFactory.class.php');
    require_once(ROOT . '/twitter/factory/TwitterUserFactory.class.php');
    require_once(ROOT . '/twitter/api/TwitterApi.class.php');
    require_once(ROOT . '/twitter/model/Tweet.class.php');
    
    class TwitterFactory extends \core\factory\GenericFactory {
        
        //apen_dashboard_a twitter app
        //@stadantwerpen access token
        // private $config = array('key'               => '47MHPAfhtJE8IGMt5QPAA',
        //                         'secret'            => '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8',
        //                         'accessToken'       => '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs',
        //                         'accessTokenSecret' => 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI');
        
        
        protected $api; 
        public function __construct() {
            parent::__construct(new \twitter\model\Tweet());
            $this->api = new \twitter\api\TwitterApi();
            $this->twitterUserFactory = new TwitterUserFactory();
        } 
        
        public function createSourceReferencesByName($name){
            return $this->twitterUserFactory->toArray($this->api->searchUsers($name));
        }
    }
?>
