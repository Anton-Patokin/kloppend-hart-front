<?php
error_reporting(E_ALL); ini_set('display_errors', '1');
require_once ('../service/InstagramService.class.php');
require_once('../../util/TestClass.class.php');

$instagramService = new \dataMining2\service\InstagramService();

var_dump(get_class_methods($instagramService));
//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($instagramService);
var_dump($testClass->testByUrl());
//var_dump($facebookService->$_GET['method'])




?>