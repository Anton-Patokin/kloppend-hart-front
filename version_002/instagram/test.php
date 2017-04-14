<?php

	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once (ROOT . 'instagram/api/instagramApi.class.php');

	$api = new \instagram\api\instagramApi();

	// var_dump($api->SearchLocation(51.1863162, 4.4727604, 0));
	$api->authenticate('public_content');
	// echo 'test';
	// $api->followedBy();
	// var_dump($api->getUserById(1911052429));
	// $api->getSelf();
	// var_dump($api->follows());
	// var_dump($api->getRecentMediaOfSelf());
	// var_dump($api->getRecentMediaOfUser(40563439, 5));

?>