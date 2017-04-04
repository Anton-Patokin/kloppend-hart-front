<?php
define('DS', DIRECTORY_SEPARATOR);
DEFINE('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');


//check if url is set
$url = isset($_GET['url']) ? $_GET['url'] : NULL;

require_once (ROOT_FRONT . DS . 'library' . DS . 'bootstrap.php');
?>