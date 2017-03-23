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

<!-- <div ng-show="showTrendingDiv" ng-controller="topTrendingController" class="top-trending-list col-md-3 pull-right">
    <button ng-click="showTrending()" class="btn-trending btn-trending-toggle">TRENDING</button>
    
    <div ng-show="isTrending" class="top-trending-now">
        <h2>Trending</h2>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3>Top 15 now</h3>
            </div>
            <div class="top-15 panel-body">
                <ol>
                    <li ng-repeat="poi in topTrendingList">{{ poi['name'] }}</li>
                </ol>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3>Top places nearby</h3>
            </div>
            <div class="panel-body">
                <div ng-show="trendingList" class="top-10">
                    <ol>
                        <li ng-repeat="poi in trendingList">{{ poi['name'] }}</li>
                    </ol>
                </div>
                <div ng-hide="trendingList">
                    <p id="no-nearby-places">There are no hot nearby places</p>
                </div>
            </div>
        </div>
        <div class="test">
            <p id="demo"></p>
        </div>
    </div>
    <div class="top-trending-near">
        <h3>Near</h3>
    </div>

</div> -->

<div class="size_map">
    <ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="map.draggable" options="map.options" events="map.events">


        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_facebook" onCreated="heatLayerCallback_facebook"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_foursquare" onCreated="heatLayerCallback_foursquare"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_apen" onCreated="heatLayerCallback_apen"></ui-gmap-layer>

        <ui-gmap-markers doCluster="true" typeOptions="{minimumClusterSize : 1}" models="heatmepData"
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

    </ui-gmap-google-map>
</div>