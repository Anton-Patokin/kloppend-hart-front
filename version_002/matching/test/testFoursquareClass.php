<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/FoursquareService.class.php');
require_once('../../util/TestClass.class.php');

$foursquareService = new \matching\service\FoursquareService();

$testClass = new \util\TestClass($foursquareService);

$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);

?>