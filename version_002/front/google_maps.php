<div class="container background_white">
    <?php
    require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    DEFINE('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');

    include_once(ROOT_FRONT . 'application/controllers/heatmapController.php');
    $heatmap = new heatmapController();
//     echo $value= $heatmap->getMetricsByTimeRange('2017-02-28 00:00:00','2017-02-28 23:00:00');
    ?>

</div>


<ui-gmap-google-map   center="map.center"  zoom="map.zoom" draggable="true" options="options">
    <ui-gmap-markers  doCluster="true" models="marker.randomMarkers_0" coords="'self'" icon="marker.icon_0">
    </ui-gmap-markers>
    <ui-gmap-markers doCluster="true" models="marker.randomMarkers_1" coords="'self'" icon="marker.icon_1">
    </ui-gmap-markers>
</ui-gmap-google-map>