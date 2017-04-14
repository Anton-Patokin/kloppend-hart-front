<?php
require_once(ROOT . 'velo/service/VeloService.class.php');

$matchService = new \velo\service\VeloService();
$matchService->getVeloStations();
?>