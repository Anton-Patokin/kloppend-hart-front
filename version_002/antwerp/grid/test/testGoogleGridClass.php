<?php

require_once ('../service/GoogleGridService.class.php');
require_once('../../../util/TestClass.class.php');

$googleGridService = new \antwerp\grid\service\GoogleGridService();

var_dump(get_class_methods($googleGridService));

$testClass = new \util\TestClass($googleGridService);
var_dump($testClass->testByUrl());
?>
