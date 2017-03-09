<?php

require_once ('../service/PoiStatsTimeAggregatedService.class.php');
require_once('../../util/TestClass.class.php');

$timeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();

var_dump(get_class_methods($timeAggregatedService));

$testClass = new \util\TestClass($timeAggregatedService);
var_dump($testClass->testByUrl());
?>
