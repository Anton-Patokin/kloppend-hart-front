<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../api/TwitterApi.class.php');
require_once('../../util/TestClass.class.php');

//apen_dashboard_a twitter app
//@stadantwerpen access token
// $config = array('key'               => '47MHPAfhtJE8IGMt5QPAA',
//                 'secret'            => '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8',
//                 'accessToken'       => '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs',
//                 'accessTokenSecret' => 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI');

// $api = new \twitter\api\TwitterApi($config['accessToken'], $config['accessTokenSecret'], $config['key'], $config['secret']);

$api = new \twitter\api\TwitterApi();

var_dump($api->searchTweetsUsers('frankdeboosere'));
// $api->searchTweetsUsers('frankdeboosere');
// $api->searchUsers('frankdeboosere');

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

// $testClass = new \util\TestClass($api);
// $result = $testClass->testByUrl();

// if(is_string($result))
//     print ($result);
// else
//     var_dump($result);

?>
