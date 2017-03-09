<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/TwitterService.class.php');
require_once('../../util/TestClass.class.php');

$twitterService = new \dataMining2\service\TwitterService();

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($twitterService);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>
