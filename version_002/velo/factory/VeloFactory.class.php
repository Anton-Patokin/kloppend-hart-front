<?php
namespace source\factory;
require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'velo/dao/VeloDAO.class.php');
require_once(ROOT . 'velo/api/VeloApi.class.php');
require_once(ROOT . 'velo/model/VeloModel.class.php');

class VeloFactory extends \core\factory\GenericFactory
{
    protected $dao;
    protected $api;

    public function __construct()
    {
        $this->dao = new \velo\dao\VeloDAO();
        $this->api = new \velo\api\VeloApi();
    }

    public function getVeloStations()
    {
        $velosStations = $this->api->getAllVelo();
        foreach ($velosStations->data as $key => $station) {
            $velo = $this->extractStationFromVeloStations($station);
            $exist = $this->dao->getVeloById($velo->velo_id);
            if (!$exist) {
                $this->dao->saveVeloStations($velo);
            }
        }
    }

    public function extractStationFromVeloStations($velo)
    {
        $veloStation = new \velo\model\VeloModel();
        $veloStation->velo_id = $velo->objectid;
        $veloStation->name = $velo->naam;
        $veloStation->aantal_loc = $velo->aantal_loc;
        $veloStation->point_lat = $velo->point_lat;
        $veloStation->point_lng = $velo->point_lng;
        $veloStation->creat_date = date('Y-m-d H:i:s');
        return $veloStation;
    }

}