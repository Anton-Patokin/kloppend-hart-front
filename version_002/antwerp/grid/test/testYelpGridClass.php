<?php

require_once ('../service/YelpGridService.class.php');
require_once('../../../util/TestClass.class.php');

$yelpGridService = new \antwerp\grid\service\YelpGridService();

var_dump(get_class_methods($yelpGridService));

$testClass = new \util\TestClass($yelpGridService);
var_dump($testClass->testByUrl());
?>
