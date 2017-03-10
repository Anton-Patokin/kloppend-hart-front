<?php

class HTML {

	function sanitize($data) {
		return mysql_real_escape_string($data);
	}

	function includeJs($fileName) {
		$data = '<script src="'.BASE_PATH.'/js/'.$fileName.'.js"></script>';
		return $data;
	}

	function includeCss($fileName) {
		$data = '<link href="'.BASE_PATH.'/css/'.$fileName.'.css" rel="stylesheet" type="text/css" />';
		return $data;
	}
}