<?php

require_once ('../service/SourceReferencePoiMatchService.class.php');
require_once('../../util/TestClass.class.php');

$matchService = new \source\service\SourceReferencePoiMatchService();

//var_dump(get_func_argNames($facebookService, 'getRelevantReferences'));

$testClass = new \util\TestClass($matchService);
$result = $testClass->testByUrl();

if(is_string($result))
    print ($result);
else
    var_dump($result);
?>
