<?php
error_reporting(E_ALL); ini_set('display_errors', '1');
require_once ('../service/GoogleService.class.php');
require_once('../../util/TestClass.class.php');

$googleService = new \dataMining2\service\GoogleService();

$testClass = new \util\TestClass($googleService);
var_dump($testClass->testByUrl());

?>