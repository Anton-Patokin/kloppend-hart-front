<?php

DEFINE("HTTP_GET","GET");
DEFINE("HTTP_POST","POST");
DEFINE('ROOT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\\');
// define('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');
set_time_limit(120);
global $pdo;
	try {
		$pdo = new \PDO ('mysql:dbname=kha;host=localhost;charset=UTF8', 'root', '',
						 array(\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
	}catch (PDOException $e) {
		echo "PDO initialization failed: " . $e->getMessage() . "\n";
	}
date_default_timezone_set('Europe/Brussels');
?>
