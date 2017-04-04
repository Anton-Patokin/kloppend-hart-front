<?php
$url = isset($_GET['url']) ? $_GET['url'] : NULL;
if(isset($_GET['url'])){
    header("Location: http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/"); /* Redirect browser */
    exit();
}
?>
<?php include_once 'header.php'; ?>
<body ng-app="myApp" ng-controller="PrimeController" ng-class="{'hide-overflow' : showOverflow, 'show-overflow' : !showOverflow}">
		<?php include_once 'navbar.php'; ?>
        <?php include_once 'navbar_top.php'; ?>
		<div class="ng-view-frame" ng-view></div>    
   		<?php include_once 'google_maps.php' ;?>
<?php include_once 'footer.php'; ?>

