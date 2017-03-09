<?php

require_once ('../service/FacebookGridService.class.php');
require_once('../../../util/TestClass.class.php');

$facebookGridService = new \antwerp\grid\service\FacebookGridService();

var_dump(get_class_methods($facebookGridService));

$testClass = new \util\TestClass($facebookGridService);
var_dump($testClass->testByUrl());
?>
