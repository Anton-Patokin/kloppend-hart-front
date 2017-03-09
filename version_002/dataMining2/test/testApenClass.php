<?php

error_reporting(E_ALL); ini_set('display_errors', '1');

require_once ('../service/ApenService.class.php');
require_once('../../util/TestClass.class.php');

$apenService = new \dataMining2\service\ApenService();

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($apenService);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>
