<?php

namespace instagram\service;
require_once ('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002/settings.php');
// require_once(ROOT . 'instagram/factory/InstagramLocationFactory.class.php');
// require_once(ROOT . 'instagram/factory/InstagramMediumFactory.class.php');
require_once(ROOT . 'instagramTest/factory/InstagramTestUserFactory.class.php');


class InstagramService{
    
        // protected $instagramLocationFactory;
        // protected $instagramMediumFactory;
        protected $instagramUserFactory;
    
        public function __construct()
        {
            // $this->instagramLocationFactory = new \instagram\factory\InstagramLocationFactory();
            // $this->instagramMediumFactory = new \instagram\factory\InstagramMediumFactory();
            $this->instagramUserFactory = new \instagram\factory\InstagramTestUserFactory();
        }
	
}
?>
