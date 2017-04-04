<?php
//documentation
//http://anantgarg.com/2009/03/13/write-your-own-php-mvc-framework-part-1/
require_once ('public' . DIRECTORY_SEPARATOR . 'index.php');

?>
<?php include_once 'header.php'; ?>
<body ng-app="myApp" ng-controller="PrimeController" ng-class="{'hide-overflow' : showOverflow, 'show-overflow' : !showOverflow}">
		<?php include_once 'navbar.php'; ?>
        <?php include_once 'navbar_top.php'; ?>
		<div class="ng-view-frame" ng-view></div>    
   		<?php include_once 'google_maps.php' ;?>
<?php include_once 'footer.php'; ?>

