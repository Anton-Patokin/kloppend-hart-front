<?php

error_reporting(E_ALL); ini_set('display_errors', '1');
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');

require_once ('../factory/TwitterFactory.class.php');
require_once('../../util/TestClass.class.php');

$factory = new \twitter\factory\TwitterFactory();

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($factory);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);

?>
