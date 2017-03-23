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

</div>
<div class="container">
    <!--{{totalHeatmapData['facebook']}}-->
</div>
<div ng-class="size_map">
    <ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="map.draggable" options="map.options"
                        events="map.events" control="map.control">


        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_facebook"
                       onCreated="heatLayerCallback_facebook"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_foursquare"
                       onCreated="heatLayerCallback_foursquare"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_apen"
                       onCreated="heatLayerCallback_apen"></ui-gmap-layer>

        <ui-gmap-markers doCluster="true" typeOptions="{minimumClusterSize : 1}" models="clusterData"
                         events="map.markersEvents" coords="'self'" heatmap-layer="{}"
                         icon="{url: 'images/markers/marker_0.png'}" options="showHeatmapBool">
        </ui-gmap-markers>


        <div ng-repeat="marker in markerss">
            <ui-gmap-markers doCluster="false" models="marker"
                             events="map.markersEvents" coords="'self'"
                             icon="{url: 'images/markers/marker_'+marker[0].icon+'.png'}" options="showHeatmapBool">
                <ui-gmap-windows show="show">
                    <div ng-non-bindable>{{title}}</div>
                </ui-gmap-windows>

            </ui-gmap-markers>
        </div>
        <ui-gmap-marker  coords="marker_center.coords" options="bounce_marker_options"  idkey="marker_center.id" icon="{url: 'images/markers/marker_'+marker_center.icon+'.png'}">
        </ui-gmap-marker>

    </ui-gmap-google-map>
</div>