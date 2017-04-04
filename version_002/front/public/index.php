<?php
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_FRONT', dirname(dirname(__FILE__)));

//check if url is set
$url = isset($_GET['url']) ? $_GET['url'] : NULL;
// if(isset($_GET['category'])){
//     echo $_GET['category'];
//     return;
// }
require_once (ROOT_FRONT . DS . 'library' . DS . 'bootstrap.php');