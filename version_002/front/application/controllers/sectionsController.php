<?php

class sectionsController extends Controller{
    
    public function section7()
    {
    	$this->doNotRenderHeader = 0;
    	// include_once "../views/sections/section7.php";
    	require_once ROOT_FRONT . '/application/views/header.php';
    	include_once ROOT_FRONT . "/application/views/sections/section7.php";
    	
    }

    public function index()
    {
    	echo 'index function';
    }
    
}
?>
