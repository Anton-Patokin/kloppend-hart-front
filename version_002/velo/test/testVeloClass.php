<?php

require_once ('../service/VeloService.class.php');
require_once('../../util/TestClass.class.php');

$matchService = new \velo\service\VeloService();

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($matchService);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>
