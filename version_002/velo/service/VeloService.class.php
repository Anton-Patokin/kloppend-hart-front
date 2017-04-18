<?php

namespace velo\service;
require_once ('iService.php');
require_once(ROOT . 'velo/factory/VeloFactory.class.php');

class VeloService {

    protected $factory;

    public function __construct() {
        $this->factory = new \source\factory\VeloFactory();
    }
    
    public function getVeloStations(){
        $this->factory->getVeloStations();
    }
}