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
<div ng-init='disableSroll()' class="section-wrapper">
    <?php if($_GET['action'] == 'show'): ?>
        <div class="row subcategories-menu-wrapper">
            <div class="col-md-12 subcategories-menu">
                <ul>
                    <?php foreach($subcategories as $key => $subcategory): ?>
                        <a href="#section1/<?= $getCategory ?>/show/<?= $subcategory['link'] ?>"><li class="<?= (strtolower($subcategory['link']) == strtolower($getSubcategory))? 'subcategory-active' : '' ?> <?= (($key % 2) == 0) ? 'even' : 'oneven' ;?>"><?= $subcategory['database'] ?><span class="subcategory-arrow pull-right"><img src="<?= (strtolower($subcategory['link']) == strtolower($getSubcategory))? 'images/newdesign/arrow-active.png' : 'images/newdesign/arrow.png' ?>"></span></li></a>
                        <ul>
                            <?php if(strtolower($subcategory['link']) == strtolower($getSubcategory)): ?>
                                <?php if(isset($topPlaces) && count($topPlaces) > 0): ?>
                                    <?php for ($i=0; $i < 10; $i++): ?>
                                        <?php if(isset($topPlaces[$i])): ?>
                                            <!-- <a href="#section1/<?= $getCategory ?>/<?= $subcategory['link'] ?>/<?= $topPlaces[$i]->nid ?>"><li><?= $topPlaces[$i]->name ?></li></a> -->
                                            <p class="detail-top-place" ng-click="testFunction(<?= $topPlaces[$i]->nid ?>)"><span class="place"><?= ($i == 9)? '0' : '00' ?><?= $i + 1 ?>.</span><?= $topPlaces[$i]->name ?></p>
                                        <?php endif ?>
                                    <?php endfor ?>
                                    <?php else: ?>
                                        <li>Geen plaatsen</li>
                                    <?php endif ?>
                            <?php endif ?>
                        </ul>
                    <?php endforeach ?>
                </ul>
                <?= $message ?>
            </div>
        </div>
    <?php endif ?>
    <div class="<?= ($_GET['action'] == 'show')? '' : 'poi-search-details'?> poi-details-wrapper clearfix">
        <div masonry="true" class="poi-details">
            <div class="col-md-6 clearfix">
                <div class="poi-text masonry-brick">
                    <div ng-show="loadInfo" layout="row" layout-sm="column" layout-align="space-around">
                        <md-progress-circular md-mode="indeterminate"></md-progress-circular>
                    </div>
                    <div class="node-title">
                    </div>
                    <div class="node-body">
                    </div>
                    <div class="apen-link">
                    </div>
                </div>
            </div>
            <div class="col-md-6 clearfix">
                <div class="poi-photo masonry-brick">
                    <div class="temp-photo">
                    </div>
                </div>
            </div>
            <div class="poi-chart">
                <div class="col-md-6 clearfix">
                    <div class="masonry-brick">
                        <div id="morris-analytics">
                            <div ng-show="loadChart" layout="row" layout-sm="column" layout-align="space-around">
                                <md-progress-circular md-mode="indeterminate"></md-progress-circular>
                            </div>
                        </div>
                        <div class="stats-analytics clearfix">
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
            </div>
            <div class="col-md-6">
                <div class="social-media-stream masonry-brick">

                </div>
            </div>
            
        </div>
    </div>
</div>