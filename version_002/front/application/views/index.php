
<body ng-app="myApp" ng-controller="PrimeController" ng-class="{'hide-overflow' : showOverflow, 'show-overflow' : !showOverflow}">
		<?php include_once 'navbar.php'; ?>
        <?php include_once 'navbar_top.php'; ?>
		<div ng-hide="hideFrame" class="ng-view-frame" ng-view></div>
   		<?php include_once 'google_maps.php' ;?>


