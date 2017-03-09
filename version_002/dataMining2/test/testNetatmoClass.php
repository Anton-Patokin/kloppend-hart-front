<?php

require_once ('../service/NetatmoService.class.php');
require_once('../../util/TestClass.class.php');

$netatmoService = new \dataMining2\service\NetatmoService();

var_dump(get_class_methods($netatmoService));
//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($netatmoService);
var_dump($testClass->testByUrl());
//var_dump($facebookService->$_GET['method'])




?>