<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../api/GooglePlacesApi.class.php');
require_once('../../../util/TestClass.class.php');

$api = new \google\places\api\GooglePlacesApi();

$testClass = new \util\TestClass($api);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);

?>
