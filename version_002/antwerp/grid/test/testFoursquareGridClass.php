<?php

require_once ('../service/FoursquareGridService.class.php');
require_once('../../../util/TestClass.class.php');

$foursquareGridService = new \antwerp\grid\service\FoursquareGridService();

var_dump(get_class_methods($foursquareGridService));

$testClass = new \util\TestClass($foursquareGridService);
var_dump($testClass->testByUrl());
?>
