<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/InstagramService.class.php');
require_once('../../util/TestClass.class.php');

$instagramService = new \matching\service\InstagramService();

$testClass = new \util\TestClass($instagramService);

$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>