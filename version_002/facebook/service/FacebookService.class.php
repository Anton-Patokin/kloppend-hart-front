<?php

namespace facebook\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');
require_once(ROOT . 'facebook/factory/FacebookFactory.class.php');

class FacebookService{
    
        protected $facebookFactory;
    
        public function __construct()
        {
            $this->facebookFactory = new \facebook\factory\FacebookFactory();
        }
	
}
?>
