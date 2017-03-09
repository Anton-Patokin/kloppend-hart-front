<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/FacebookService.class.php');
require_once('../../util/TestClass.class.php');

$facebookService = new \matching\service\FacebookService();

$testClass = new \util\TestClass($facebookService);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);

?>