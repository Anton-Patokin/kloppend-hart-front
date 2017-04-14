<?php
namespace instagram\model;

require_once (ROOT . 'google/maps/model/GeoLocation.class.php');

class InstagramLocation extends \google\maps\model\GeoLocation{
    public $id;
    public $name;
    
    public function __construct(){
        parent::__construct();
        $this->meta->propertyTypes['id'] = 'string';
        $this->meta->propertyTypes['name'] = 'string';
    }
}

?>
