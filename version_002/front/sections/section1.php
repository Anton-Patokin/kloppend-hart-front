<?php
	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    DEFINE('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');
    require_once(ROOT_FRONT . 'application/controllers/placeController.php');

    $placeController = new placeController();

    $getCategory = '';
    $getSubcategory = '';
    $getNid = '';
    $subcategories = array();
    $placeInfo = '';
    $message = '';

    if (isset($_GET['category']) && isset($_GET['action']) && isset($_GET['value'])) {
        if ($_GET['action'] == 'show') {
            $getCategory = $_GET['category'];
            $getSubcategory = $_GET['value'];

            $result = json_decode($placeController->getSubcategories($getCategory));
            foreach ($result as $subcategory) {
                $subcategories[] = array('database' => $subcategory);
            }
            foreach ($subcategories as $key=>$subcategory) {
                switch ($subcategory['database']) {
                    case 'Youth hostels':
                        $subcategories[$key]['link'] = 'Youth-hostels';
                        break;

                    case 'Bed and Breakfast':
                        $subcategories[$key]['link'] = 'Bed-and-Breakfast';
                        break;

                    case 'Openbare diensten':
                        $subcategories[$key]['link'] = 'Openbare-diensten';
                        break;

                    case 'Openbare Plaatsen':
                        $subcategories[$key]['link'] = 'Openbare-Plaatsen';
                        break;

                    case 'Park/tuin':
                        $subcategories[$key]['link'] = 'Park-tuin';
                        break;

                    case 'Monument/gebouw':
                        $subcategories[$key]['link'] = 'Monument-gebouw';
                        break;

                    case 'Concertzalen/Music Halls':
                        $subcategories[$key]['link'] = 'Concertzalen-Music-Halls';
                        break;

                    case 'Club/Discotheek':
                        $subcategories[$key]['link'] = 'Club-Discotheek';
                        break;

                    case '2de hands':
                        $subcategories[$key]['link'] = '2de-hands';
                        break;
                    
                    default:
                        $subcategories[$key]['link'] = $subcategory['database'];
                        break;
                }
            }

            $topPlaces = json_decode($placeController->getTopPlacesByCategory($getCategory, $getSubcategory));
        }
        if ($_GET['action'] == 'zoek') {
            $getNid = $_GET['value'];
        }
    }

    


?>
<div ng-init='unebaleScroll()' class="container">
    <?php if($_GET['action'] == 'show'): ?>
        <div class="row">
            <div class="col-md-12">
                <ol>
                    <?php foreach($subcategories as $subcategory): ?>
                        <a href="#section1/<?= $getCategory ?>/show/<?= $subcategory['link'] ?>"><li><?= $subcategory['database'] ?></li></a>
                        <ul>
                            <?php if(strtolower($subcategory['link']) == strtolower($getSubcategory)): ?>
                                <?php if(isset($topPlaces) && count($topPlaces) > 0): ?>
                                    <?php for ($i=0; $i < 10; $i++): ?>
                                        <?php if(isset($topPlaces[$i])): ?>
                                            <!-- <a href="#section1/<?= $getCategory ?>/<?= $subcategory['link'] ?>/<?= $topPlaces[$i]->nid ?>"><li><?= $topPlaces[$i]->name ?></li></a> -->
                                            <p class="detail-top-place" ng-click="testFunction(<?= $topPlaces[$i]->nid ?>)"><?= $topPlaces[$i]->name ?></p>
                                        <?php endif ?>
                                    <?php endfor ?>
                                    <?php else: ?>
                                        <li>Geen plaatsen</li>
                                    <?php endif ?>
                            <?php endif ?>
                        </ul>
                    <?php endforeach ?>
                </ol>
                <?= $message ?>
            </div>
        </div>
    <?php endif ?>
    <div class="row">
        <div class="col-md-12">
            <div class="nodeTitle">
            </div>
            <div class="nodeBody">
            </div>

        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div id="morris-analytics">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="stats-analytics">
                <div class="apen-stats col-md-4">
                    <div class="apen-title">
                    </div>
                    <div class="apen-total">
                    </div>
                    <div class="apen-visits">
                    </div>
                </div>
                <div class="facebook-stats col-md-4">
                    <div class="facebook-title">
                    </div>
                    <div class="facebook-total">
                    </div>
                    <div class="facebook-likes">
                    </div>
                    <div class="facebook-checkins">
                    </div>
                    <div class="facebook-talking-abouts">
                    </div>
                </div>
                <div class="foursquare-stats col-md-4">
                    <div class="foursquare-title">
                    </div>
                    <div class="foursquare-total">
                    </div>
                    <div class="foursquare-checkins">
                    </div>
                    <div class="foursquare-users">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="col-md-12">
        <div id="map_canvas" ng-controller="section1" style="height: 500px">
            <ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="true" options="options">
                <ui-gmap-marker idkey="marker.id" coords="marker.coords" options="marker.options" click="onClick()" events="marker.events" >
                    <ui-gmap-window options="windowOptions" closeClick="closeClick()">
                    </ui-gmap-window>
                </ui-gmap-marker>
            </ui-gmap-google-map>
        </div>
    </div> -->
</div>