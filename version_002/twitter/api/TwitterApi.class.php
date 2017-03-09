<?php
namespace twitter\api;

require_once "BaseTwitterApi.class.php";

class TwitterApi extends BaseTwitterApi {

    public function __construct($accessToken, $accessTokenSecret, $key, $secret) {
        parent::__construct($accessToken, $accessTokenSecret, $key, $secret);
    }

    public function search($q, $include_entities='false',  $count='15',$result_type='mixed', $lang=null, $locale=null, $geocode=null, $until=null, $since_id=null, $max_id=null){

        $request      = 'search/tweets.json';
        $args         = $this->getArgumentNames('search');
        $requestArgs  = $this->getDefaultArgumentValues($args);

        foreach($args as $arg){
            $name = $arg->name;
            if($$name != null)
                $requestArgs[$name] = $$name;
        }

        return parent::call($request, $requestArgs);
    }


    public function searchUsers($q, $include_entities='false',  $count='20', $page=null){

        $request      = 'users/search.json';
        $args         = $this->getArgumentNames('searchUsers');
        $requestArgs  = $this->getDefaultArgumentValues($args);

        foreach($args as $arg){
            $name = $arg->name;
            if($$name != null)
                $requestArgs[$name] = $$name;
        }

        return parent::call($request, $requestArgs);
    }

    public function searchTweetsUsers($q)
    {
        $request = 'statuses/user_timeline.json';
        $args = $this->getArgumentNames('searchTweetsUsers');
        $requestArgs = $this->getDefaultArgumentValues($args);

        foreach($args as $arg){
            $name = $arg->name;
            if($$name != null)
                $requestArgs[$name] = $$name;
        }

        return parent::call($request, $requestArgs);
    }



    private function getArgumentNames($function){
        $f = new \ReflectionMethod($this, $function);
        $args = array();
        foreach($f->getParameters() as $param){
            $args[] = $param;
        }
        return $args;
    }

    private function getDefaultArgumentValues($argParams){
        $args = array();
        foreach($argParams as $arg){
            if($arg->isOptional())
                $args[$arg->name] = $arg->getDefaultValue();
        }
        return $args;
    }

}

?>
