<?php
$url = isset($_GET['url']) ? $_GET['url'] : NULL;
if(isset($_GET['url'])){
    header("Location: http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/"); /* Redirect browser */
    exit();
}
?>

<?php include_once 'header.php'; ?>
<body ng-app="myApp" ng-controller="PrimeController">

		<?php include_once 'navbar.php'; ?>
        <?php include_once 'navbar_top.php'; ?>
		<div class="ng-view-frame" ng-view></div>    
   		<?php include_once 'google_maps.php' ;?>
<!--    <ui-gmap-google-map center='map.center' zoom='map.zoom'></ui-gmap-google-map>-->
        

<!--    fit='true' doCluster="true"-->

<?php include_once 'footer.php'; ?>


<!--<body ng-app="myApp">-->

<!--<div >-->
<!---->
<!--    <div class="container-fluid">-->
<!--        <div class="col-md-12 background_white">-->
<!--            --><?php //include_once 'navbar_top.php'; ?>
<!--        </div>-->
<!--    </div>-->
<!--    <div ng-view></div>-->
<!--</div>-->
<!---->

<!---->
<!---->
<!---->
