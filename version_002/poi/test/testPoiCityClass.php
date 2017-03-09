<?php

require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');

require_once ('../factory/PoiCityFactory.class.php');
require_once('../../util/TestClass.class.php');

$poiCityFactory = new \poi\factory\PoiCityFactory();

$testClass = new \util\TestClass($poiCityFactory);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>
