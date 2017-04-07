<?php
    $rootPath = "https://apen.be/kloppend-hart-antwerpen/front/";
?>
<div ng-controller="SideBarController">
	<div class="navbar navbar-inverse navbar-fixed-left sidenav">
		<div ng-click="toggleLeft(); toggleTrending('close');" class="hamburger-icon">
			<img src="<?= $rootPath ?>images/newdesign/hamburger.png">
		</div>
		<div class="icons">
			<ul>
				<a ng-click="home(); toggleTrending('close'); closeSideNav(); enableFooter();" href=""><li ng-class="{ active: isActive('')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('') && 'home_active.png' || 'home.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/horeca/show/restaurant"><li ng-class="{ active: isActive('/section1/horeca/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/horeca/show') && 'coffee_active.png' || 'coffee.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/cultuur/show/gallerij"><li  ng-class="{ active: isActive('/section1/cultuur/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/cultuur/show') && 'film_active.png' || 'film.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/over_de_stad/show/Openbare-diensten"><li ng-class="{ active: isActive('/section1/over_de_stad/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/over_de_stad/show') && 'city_active.png' || 'city.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/winkel/show/kleding"><li ng-class="{ active: isActive('/section1/winkel/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/winkel/show') && 'sale_active.png' || 'sale.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/uitgaan/show/film"><li ng-class="{ active: isActive('/section1/uitgaan/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/uitgaan/show') && 'pint_active.png' || 'pint.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section1/vrije_tijd/show/sport"><li ng-class="{ active: isActive('/section1/vrije_tijd/show')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section1/vrije_tijd/show') && 'plane_active.png' || 'plane.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section8"><li ng-class="{ active: isActive('/section8')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section8') && 'sun_active.png' || 'sun.png'}}"></li></a>
				<a ng-click="closeSideNav(); toggleTrending('close');" href="#section7"><li ng-class="{ active: isActive('/section7')}"><img src="<?= $rootPath ?>images/newdesign/{{isActive('/section7') && 'car_active.png' || 'car.png'}}"></li></a>
				<li></li>
			</ul>
		</div>
	</div>
	<section>
		<md-sidenav class="left1" md-component-id="left1">
			<div class="kha-logo-wrapper">
				<div ng-click="home(); closeSideNav(); toggleTrending('close'); enableFooter();" class="kha-logo">
					<img src="<?= $rootPath ?>images/newdesign/logo-small.png">
				</div>				
			</div>
			<div class="icon-titles">
				<ul>
					<!-- <li ng-click="toggleLeft()">Horeca<span class="pull-right">></span></li>
					<li ng-click="toggleLeft()">Cultuur<span class="pull-right">></span></li>
					<li ng-click="toggleLeft()">Over de stad<span class="pull-right">></span></li>
					<li ng-click="toggleLeft()">Shopping<span class="pull-right">></span></li>
					<li ng-click="toggleLeft()">Verkeer<span class="pull-right">></span></li>
					<li ng-click="toggleLeft()">Vrije tijd<span class="pull-right">></span></li>
					<a href="#section7"><li>Weer<span class="pull-right">></span></li></a> -->
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/horeca/show/restaurant"><li ng-class="{ active: isActive('/section1/horeca/show')}">Horeca<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/horeca/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/cultuur/show/gallerij"><li  ng-class="{ active: isActive('/section1/cultuur/show')}">Cultuur<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/cultuur/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/over_de_stad/show/Openbare-diensten"><li ng-class="{ active: isActive('/section1/over_de_stad/show')}">Over de stad<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/over_de_stad/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/winkel/show/kleding"><li ng-class="{ active: isActive('/section1/winkel/show')}">Shopping<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/winkel/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/uitgaan/show/film"><li ng-class="{ active: isActive('/section1/uitgaan/show')}">Uitgaan<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/uitgaan/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section1/vrije_tijd/show/sport"><li ng-class="{ active: isActive('/section1/vrije_tijd/show')}">Vrije tijd<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/vrije_tijd/show') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section8"><li ng-class="{ active: isActive('/section8')}">Weer<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section8') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
					<a ng-click="toggleLeft(); toggleTrending('close');" href="#section7"><li ng-class="{ active: isActive('/section7')}">Verkeer<span class="subcategory-arrow pull-right"><img ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section7') && 'arrow_white.png' || 'arrow.png'}}"></span></li></a>
				</ul>
			</div>
		</md-sidenav>
	</section>
	
</div>