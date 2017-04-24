<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
try {
	include_once ('../service/YelpGridService.class.php');
	include_once('../../../util/TestClass.class.php');

	$yelpGridService = new \antwerp\grid\service\YelpGridService();

	var_dump(get_class_methods($yelpGridService));

	$testClass = new \util\TestClass($yelpGridService);
	var_dump($testClass->testByUrl());
} catch (Exception $e) {
	var_dump($e);	
}

?>
