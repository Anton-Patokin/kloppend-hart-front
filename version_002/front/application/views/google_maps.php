<?php

$rootScope = "https://apen.be/kloppend-hart-antwerpen/front/";

?>
<div>
    <div ng-if="showGoogleMaps">
        <ui-gmap-google-map ng-class="{'size_map_small' : size_map,'size_map_full' : !size_map}" center="map.center"
                            zoom="map.zoom" draggable="map.draggable" options="map.options"
                            events="map.events" control="map.control">

            <ui-gmap-layer type="BicyclingLayer" show="show_bicycling"></ui-gmap-layer>

            <ui-gmap-layer type="TrafficLayer" show="show_traffic"></ui-gmap-layer>

            <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_facebook"
                           onCreated="heatLayerCallback_facebook"></ui-gmap-layer>
            <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_foursquare"
                           onCreated="heatLayerCallback_foursquare"></ui-gmap-layer>
            <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_apen"
                           onCreated="heatLayerCallback_apen"></ui-gmap-layer>

            <ui-gmap-markers doCluster="false" models="velo"
                             events="map.velo.event" coords="'self'"
                             icon="{url: '<?= $rootScope ?>/images/markers/marker_2.png'}" options="showvelo">
                <ui-gmap-windows show="map.show">
                    <div ng-non-bindable>
                        <div>
                            <h4 class="heading-pop-up-velo">
                                {{aantal_loc}} fietsen op dit station
                            </h4>

                        </div>
                    </div>
                </ui-gmap-windows>
            </ui-gmap-markers>

            <ui-gmap-markers doCluster="true" typeOptions="{minimumClusterSize : 1}" models="clusterData"
                             events="map.markersEvents" coords="'self'" heatmap-layer="{}"
                             icon="{url: '<?= $rootScope ?>/images/markers/marker_0.png'}" options="showHeatmapBool">
            </ui-gmap-markers>


            <div ng-repeat="marker in markerss">
                <ui-gmap-markers doCluster="false" models="marker"
                                 events="map.markersEvents" coords="'self'"
                                 icon="{url: '<?= $rootScope ?>images/markers/marker_'+marker[0].icon+'.png'}"
                                 options="showHeatmapBool">
                    <ui-gmap-windows show="show">
                        <div ng-non-bindable>{{title}}</div>
                    </ui-gmap-windows>

                </ui-gmap-markers>
            </div>
            <ui-gmap-marker coords="marker_center.coords" options="bounce_marker_options" idkey="marker_center.id"
                            icon="{url: '<?= $rootScope ?>images/markers/marker_'+marker_center.icon+'.png'}">
            </ui-gmap-marker>

        </ui-gmap-google-map>
    </div>
</div>