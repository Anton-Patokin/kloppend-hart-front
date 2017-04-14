<?php
error_reporting(E_ALL); ini_set('display_errors', '1');
require_once ('../service/YelpService.class.php');
require_once('../../util/TestClass.class.php');

$YelpService = new \dataMining2\service\YelpService();

// var_dump(get_class_methods($YelpService));
//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($YelpService);
var_dump($testClass->testByUrl());
//var_dump($facebookService->$_GET['method'])




?>