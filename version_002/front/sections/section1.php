<?php
	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	// require_once(ROOT . 'front/application/models/placeModel.php');

    require_once(ROOT . 'front/application/new/controllers/placeController.php');
    require_once(ROOT . 'front/application/new/controllers/heatmapController.php');
    // require_once(ROOT . 'front/application/controllers/heatmapController.php');

    $placeController = new placeController();

    $places = $placeController->getTopPlacesByCategory('horeca', 'restaurant');

    $places = json_decode($places, true);

    // $heatmapController = new heatmapController();

    // $heatmapController->getMetricsByTimeRange(date('Y-m-d H:i:s', time()-3600), date('Y-m-d H:i:s', time()));


?>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <?php var_dump($places) ?>
        </div>
    </div>
</div>