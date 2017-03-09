<?php

namespace util;

class TestClass {
    
    private $object;
    
    function __construct($object){
        $this->object = $object;
	
	set_time_limit(60);
    }
    
    function testByUrl(){
        if(isset($_GET['method']))
            $f = $_GET['method'];
        else
            return $this->getObjectMethods();
        
        $args = $this->getFunctionArgumentNames($f);
        $argValues = $this->getArgumentValuesByUrl($args);

        return call_user_func_array(array($this->object, $f), $argValues);
    }
    
    function getFunctionArgumentNames($functionName) {
        $f = new \ReflectionMethod($this->object, $functionName);
        $result = array();
        foreach ($f->getParameters() as $param) {
            $result[] = $param->name;   
        }
        return $result;
    }
    
    function getArgumentValuesByUrl($argumentNames = array()){
        $args = array();
        foreach($argumentNames as $arg){
            $args[$arg] = (isset($_GET[$arg])) ? $_GET[$arg] : null;
        }
        return $args;
    }
    
    function getObjectMethods(){
        $output = '<h3>'.get_class($this->object).'</h3><ul>';
        $methods = get_class_methods($this->object);
        foreach($methods as $method){
            $vars = implode(', ', $this->getFunctionArgumentNames($method));
            $output.= '<li>' . $method . ' (' . $vars . ')</li>';
        }
        return $output . "</ul>";
    }
}

?>
