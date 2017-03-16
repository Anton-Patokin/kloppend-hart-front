<div class="container background_white">
    <?php
    //    $url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/heatmap/getMetricsByTimeRange/2017-01-25%2000:00:00/2017-02-28%2023:00:00';
    //
    //    $domain = $_SERVER['HTTP_HOST'] . "/";
    //    $ch = curl_init($url);
    //    echo(curl_exec($ch));
    //    curl_close($ch);


    //    require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    //    DEFINE('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');
    //
    //    include_once(ROOT_FRONT . 'application/controllers/heatmapController.php');
    //    $heatmap = new heatmapController();
    //     echo $value= $heatmap->getMetricsByTimeRange('2017-02-28 00:00:00','2017-02-28 23:00:00');
    ?>

</div>


<ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="true" options="options" events="map.events">
    <div ng-repeat="marker in markerss">
        <ui-gmap-markers doCluster="true" models="marker" option=" options: { title: 'The White House' }"
                         events="markersEvents" coords="'self'"
                         icon="{url: 'images/markers/marker_'+marker[0].icon+'.png'}">
            <ui-gmap-windows show="show">
                <div ng-non-bindable>{{title}}</div>
            </ui-gmap-windows>

        </ui-gmap-markers>

    </div>
</ui-gmap-google-map>