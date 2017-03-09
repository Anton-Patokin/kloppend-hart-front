<?php

require_once ('../service/InstagramGridService.class.php');
require_once('../../../util/TestClass.class.php');

$instagramGridService = new \antwerp\grid\service\InstagramGridService();

var_dump(get_class_methods($instagramGridService));

$testClass = new \util\TestClass($instagramGridService);
var_dump($testClass->testByUrl());
?>
