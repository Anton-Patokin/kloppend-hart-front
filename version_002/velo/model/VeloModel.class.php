<?php
namespace velo\model;
require_once(ROOT . 'core/model/BaseModel.class.php');

class VeloModel extends \core\model\BaseModel
{
    public $velo_id;
    public $name;
    public $aantal_loc;
    public $point_lat;
    public $point_lng;
    public $creat_date;

    public function __construct()
    {
        parent::__construct();
        $this->meta->propertyTypes = array(
            'velo_id' => 'int',
            'name' => 'string',
            'aantal_loc' => 'int',
            'point_lat' => 'dec',
            'point_lng' => 'dec',
            'creat_date' => 'date');
    }
}

?>