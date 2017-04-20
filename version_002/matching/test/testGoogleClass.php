<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/GoogleService.class.php');
require_once('../../util/TestClass.class.php');

$googleService = new \matching\service\GoogleService();

$testClass = new \util\TestClass($googleService);

$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>