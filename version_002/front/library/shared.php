<?php
/** Check if environment is development and display errors **/

function setReporting() {
if (DEVELOPMENT_ENVIRONMENT == true) {
	error_reporting(E_ALL);
	ini_set('display_errors','On');
        include ROOT_FRONT . DS . 'scripts' . DS . 'dBug.php';
} else {
	error_reporting(E_ALL);
	ini_set('display_errors','Off');
	ini_set('log_errors', 'On');
	ini_set('error_log', ROOT_FRONT.DS.'tmp'.DS.'logs'.DS.'error.log');
}
}

function dump($variable){
    if (DEVELOPMENT_ENVIRONMENT == true) {
       new dBug($variable);
    }else{
        var_dump($variable);
    }
}

/** Check for Magic Quotes and remove them **/

function stripSlashesDeep($value) {
	$value = is_array($value) ? array_map('stripSlashesDeep', $value) : stripslashes($value);
	return $value;
}

function removeMagicQuotes() {
if ( get_magic_quotes_gpc() ) {
	$_GET    = stripSlashesDeep($_GET   );
	$_POST   = stripSlashesDeep($_POST  );
	$_COOKIE = stripSlashesDeep($_COOKIE);
}
}

/** Check register globals and remove them **/

function unregisterGlobals() {
    if (ini_get('register_globals')) {
        $array = array('_SESSION', '_POST', '_GET', '_COOKIE', '_REQUEST', '_SERVER', '_ENV', '_FILES');
        foreach ($array as $value) {
            foreach ($GLOBALS[$value] as $key => $var) {
                if ($var === $GLOBALS[$key]) {
                    unset($GLOBALS[$key]);
                }
            }
        }
    }
}

/** Secondary Call Function **/
/* this function can be called in controller, this way another controller can be executed */

function performAction($controller,$action,$queryString = null,$render = 0) {
	$controllerName = $controller.'Controller';
	$dispatch = new $controllerName($controller,$action);
	$dispatch->render = $render;
	return call_user_func_array(array($dispatch,$action),$queryString);
}

/** Routing **/

function routeURL($url) {
       
	global $routing;
	foreach ( $routing as $pattern => $result ) {
            if ( preg_match( $pattern, $url ) ) {
		return preg_replace( $pattern, $result, $url );
            }
	}
        return ($url);
}

/** Main Call Function **/

function callHook() {
	global $url;
	global $default;

	$queryString = array();

        
	if (!isset($url) || $url == '') {
                //fall back to default controller and action
		$controller = $default['controller'];
		$action = $default['action'];
	} else {
                //route the URL for patterns defined in routing.php
		$url = routeURL($url);
		$urlArray = array();
		$urlArray = explode("/",$url);
		$controller = $urlArray[0];
                //remove first element(controller), from the url Array
		array_shift($urlArray);
                //if action is set? use it, else fall back to index 
		if (isset($urlArray[0])) {
			$action = $urlArray[0];
                         //remove second element(action), from the url Array
			array_shift($urlArray);
		} else {
			$action = 'index'; // Default Action
		}
                //url parameter after controller and action
		$queryString = $urlArray;
	}
	
        $model = $controller . 'Model';
	$controllerName = $controller.'Controller';
        $dispatch = new $controllerName($model, $controller,$action);
   
	if ((int)method_exists($controllerName, $action)) {
		//call_user_func_array(array($dispatch,"beforeAction"),$queryString);
		call_user_func_array(array($dispatch,$action),$queryString);
		//call_user_func_array(array($dispatch,"afterAction"),$queryString);
	} else {
		/* TO-DO: display error when method doesn't exist */
	}
}


/** Autoload any classes that are required **/

function __autoload($className) {
	if (file_exists(ROOT_FRONT . DS . 'library' . DS . strtolower($className) . '.class.php')) {
		require_once(ROOT_FRONT . DS . 'library' . DS . strtolower($className) . '.class.php');
	} else if (file_exists(ROOT_FRONT . DS . 'application' . DS . 'controllers' . DS . $className . '.php')) {
		require_once(ROOT_FRONT . DS . 'application' . DS . 'controllers' . DS . $className . '.php');
	} else if (file_exists(ROOT_FRONT . DS . 'application' . DS . 'models' . DS . $className . '.php')) {
		require_once(ROOT_FRONT . DS . 'application' . DS . 'models' . DS . $className . '.php');
	} else {
		/* Error Generation Code Here */
	}
}


/** GZip Output **/

function gzipOutput() {
    $ua = $_SERVER['HTTP_USER_AGENT'];

    if (0 !== strpos($ua, 'Mozilla/4.0 (compatible; MSIE ')
        || false !== strpos($ua, 'Opera')) {
        return false;
    }

    $version = (float)substr($ua, 30); 
    return (
        $version < 6
        || ($version == 6  && false === strpos($ua, 'SV1'))
    );
}

/** Get Required Files **/

//gzipOutput() || ob_start("ob_gzhandler");


$cache = new Cache();

setReporting();
removeMagicQuotes();
unregisterGlobals();
callHook();

?>