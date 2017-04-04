<?php

    $rootScope = "https://apen.be/kloppend-hart-antwerpen/front/";

?>
<div class="container background_white">
</div>
<div ng-show="firstTimeVisited" class="overlay-back"></div>
<div ng-show="firstTimeVisited" class="welcome-message col-md-5">
    <div class="title">
        <h3>Kloppend hart van Antwerpen</h3>
        <div class="small-seperator"></div>
    </div>
    <div class="body instructions">
        <p>Welkom op de website van "Kloppend hart van Antwerpen" (= kha).</p>
        <p>We zien dat dit de eerste keer is dat je de website bezoekt dus gaan we even kort uitleggen hoe het kha juist
            werkt.</p>
        <div class="homepage-instructions">
            <div ng-click="toggleMenu($event)" id="homepage-title" class="title">
                <h4>Homepage <span class="not-active-arrow pull-right"><img
                            src="<?= $rootScope ?>images/newdesign/arrow-black.png"></span></h4>
                <div class="small-seperator"></div>
            </div>
            <div class="instruction" id="body-homepage">
                <p>Hier vind je de populairste plaatsen in Antwerpen op deze moment. Doormiddel van de tijdlijn onderaan
                    de pagina te gebruiken kan je gemakkelijk terug in de tijd gaan om te kijken wat toen de hipste
                    plaatsen waren. <br>
                    Wil je meer informatie over een bepaalde plaats? klik dan gewoon op de marker van de plaats waar je
                    meer over wilt weten.</p>
            </div>
        </div>
        <div class="top-navbar-instructions">
            <div ng-click="toggleMenu($event)" id="top-navbar-title" class="title">
                <h4>Top navbar <span class="not-active-arrow pull-right"><img
                            src="<?= $rootScope ?>images/newdesign/arrow-black.png"></span></h4>
                <div class="small-seperator"></div>
            </div>
            <div class="instruction" id="body-top-navbar">
                <p>Wanneer je op de "Trending" knop drukt krijg je de top 5 plaatsen van vandaag en de top 5 plaatsen
                    van vandaag bij u in de buurt, indien u het toestaat om je locatie vrij te geven.<br>
                    Daarnaast vind je de waarden die we gebruiken om de plaatsen te bereken op hoe populair ze zijn.
                    Tenslotte vind je uiterst rechts een zoek functie waar u gemakkelijk op de naam van een plaats kan
                    zoeken.</p>
            </div>
        </div>
        <div class="side-navbar-instructions">
            <div ng-click="toggleMenu($event)" id="side-navbar-title" class="title">
                <h4>Side navbar <span class="not-active-arrow pull-right"><img
                            src="<?= $rootScope ?>images/newdesign/arrow-black.png"></span></h4>
                <div class="small-seperator"></div>
            </div>
            <div class="instruction" id="body-side-navbar">
                <p>Hier kan je zoeken op category van de plaatsen. Als je links bovenaan op het hamburger icoontje klikt
                    krijgt u de naam te zien van de verschillende categorieën.</p>
            </div>
        </div>
        <div class="detailpage-instructions">
            <div ng-click="toggleMenu($event)" id="detailpage-title" class="title">
                <h4>Detail pagina <span class="not-active-arrow pull-right"><img src="<?= $rootScope ?>images/newdesign/arrow-black.png"></span>
                </h4>
                <div class="small-seperator"></div>
            </div>
            <div class="instruction" id="body-detailpage">
                <p>Als je op de detail pagina zit van een plaats krijgt u links een top 10 en een overzicht van alle
                    subcategorieën van de categorie waar de plaats tot behoort. Wilt u een andere subcategorie? Dat is
                    gemakkelijk! Klik gewoon op de subcategorie die je wilt bekijken in de lijst.<br>
                    Je krijgt hier ook een overzicht van info over een bepaalde plaats zoals foto's, beschrijving,
                    social media stream en een grafiek van hoe populair de plek is.</p>
            </div>
        </div>
        <div class="weer-verkeer-instructions">
            <div ng-click="toggleMenu($event)" id="weer-verkeer-title" class="title">
                <h4>Weer & verkeer pagina <span class="not-active-arrow pull-right"><img
                            src="<?= $rootScope ?>images/newdesign/arrow-black.png"></span></h4>
                <div class="small-seperator"></div>
            </div>
            <div class="instruction" id="body-weer-verkeer">
                <p>Op de pagina "Weer" krijg je een overzicht van de temperatuur in Antwerpen voor de komende dagen, een
                    buienradar, tweets over het weer en een webcam feed van de schelde/haven van Antwerpen. Op de pagina
                    "Verkeer" krijg je een mapje met de huidige verkeersituatie en tweets over ongevallen, vertragingen,
                    werken,... in en rond Antwerpen.</p>
            </div>
        </div>
        <p ng-click="closeWelcome()" class="btn btn-default pull-right">Ga verder</p>
    </div>
</div>

<div ng-class="size_map">
    <ui-gmap-google-map ng-class="{'size_map_small' : size_map,'size_map_full' : !size_map}" center="map.center"
                        zoom="map.zoom" draggable="map.draggable" options="map.options"
                        events="map.events" control="map.control">

        <ui-gmap-layer type="TrafficLayer" show="show_traffic"></ui-gmap-layer>

        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_facebook"
                       onCreated="heatLayerCallback_facebook"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_foursquare"
                       onCreated="heatLayerCallback_foursquare"></ui-gmap-layer>
        <ui-gmap-layer namespace="visualization" type="HeatmapLayer" show="showHeat_apen"
                       onCreated="heatLayerCallback_apen"></ui-gmap-layer>

        <ui-gmap-markers doCluster="true" typeOptions="{minimumClusterSize : 1}" models="clusterData"
                         events="map.markersEvents" coords="'self'" heatmap-layer="{}"
                         icon="{url: 'front/images/markers/marker_0.png'}" options="showHeatmapBool">
        </ui-gmap-markers>


        <div ng-repeat="marker in markerss">
            <ui-gmap-markers doCluster="false" models="marker"
                             events="map.markersEvents" coords="'self'"
                             icon="{url: '<?= $rootScope ?>images/markers/marker_'+marker[0].icon+'.png'}" options="showHeatmapBool">
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