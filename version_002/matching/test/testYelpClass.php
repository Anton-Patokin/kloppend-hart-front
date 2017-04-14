<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/YelpService.class.php');
require_once('../../util/TestClass.class.php');

$yelpService = new \matching\service\YelpService();

$testClass = new \util\TestClass($yelpService);

$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>