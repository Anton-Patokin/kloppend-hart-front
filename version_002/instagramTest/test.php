<?php

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once (ROOT . 'instagramTest/api/test.class.php');

	$api = new \instagramTest\api\test();

	var_dump($api->SearchLocation(51.2152904, 4.4080673, 0));
	// echo 'test';
	// $api->followedBy();
	// var_dump($api->getUserById(1911052429));
	// $api->getSelf();
	// var_dump($api->follows());
	// var_dump($api->getRecentMediaOfSelf());
	// var_dump($api->getRecentMediaOfUser(40563439, 5));

?>