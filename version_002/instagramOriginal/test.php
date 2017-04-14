<?php

	require_once("C:/xampp/htdocs/edge/projects/kloppend-hart-antwerpen/version_002/settings.php");

	require_once (ROOT . 'instagram/api/InstagramApi.class.php');

	var_dump('rdy');

	$api = new \instagram\api\InstagramApi();

	$api->searchTagsByName("Antwerpen");

?>