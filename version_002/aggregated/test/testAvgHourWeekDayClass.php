<?php

require_once ('../service/PoiAvgHourWeekDayService.class.php');
require_once('../../util/TestClass.class.php');

$avgHourWeekDayService = new \aggregated\service\PoiAvgHourWeekDayService();

var_dump(get_class_methods($avgHourWeekDayService));

$testClass = new \util\TestClass($avgHourWeekDayService);
var_dump($testClass->testByUrl());
?>
