<?php
include_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\settings.php');

require_once(ROOT_FRONT . '/application/models/VeloModel.class.php');


class veloController
{
    protected $velo;

    public function __construct()
    {
        $this->velo = new VeloModel();
    }

    public function getAll()
    {;
        echo json_encode($this->velo->getAllVelo());
    }
}


?>