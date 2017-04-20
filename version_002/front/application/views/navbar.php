<?php
    $rootPath = "https://apen.be/kloppend-hart-antwerpen/front/";
?>
<div ng-controller="SideBarController">
	<div ng-class="{sidenavtest: !sideNavtest}" class="navbar navbar-inverse navbar-fixed-left sidenav">
		<div ng-click="toggleLeft(); toggleTrending('close');" class="hamburger-icon">
			<img src="<?= $rootPath ?>images/newdesign/hamburger.png">
		</div>
		<div class="icons">
			<ul ng-click="closeSideNav(); toggleTrending('close');">
				<a ng-click="home(); closeSideNav();" href=""><li  ng-class="{ active: activeClass=='/'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/' && 'home_active.png' || 'home.png'}}"><span class="kha-logo"><img src="<?= $rootPath ?>images/newdesign/logo-small.png"></span></li></a>
				<a href="#section1/horeca/show/restaurant"><li ng-class="{ active: activeClass=='/section1/horeca/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/horeca/show' && 'coffee_active.png' || 'coffee.png'}}"><span>Horeca</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/horeca/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section1/cultuur/show/gallerij"><li  ng-class="{ active: activeClass=='/section1/cultuur/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/cultuur/show' && 'film_active.png' || 'film.png'}}"><span>Cultuur</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/cultuur/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section1/over_de_stad/show/Openbare-diensten"><li ng-class="{ active: activeClass=='/section1/over_de_stad/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/over_de_stad/show' && 'city_active.png' || 'city.png'}}"><span>Over de stad</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/over_de_stad/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section1/winkel/show/kleding"><li ng-class="{ active: activeClass=='/section1/winkel/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/winkel/show' && 'sale_active.png' || 'sale.png'}}"><span>Shopping</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/winkel/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section1/uitgaan/show/film"><li ng-class="{ active: activeClass=='/section1/uitgaan/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/uitgaan/show' && 'pint_active.png' || 'pint.png'}}"><span>Uitgaan</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/uitgaan/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section1/vrije_tijd/show/sport"><li ng-class="{ active: activeClass=='/section1/vrije_tijd/show'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section1/vrije_tijd/show' && 'plane_active.png' || 'plane.png'}}"><span>Vrije tijd</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section1/vrije_tijd/show') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section8"><li ng-class="{ active: activeClass=='/section8'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section8' && 'sun_active.png' || 'sun.png'}}"><span>Weer</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section8') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section7"><li ng-class="{ active: activeClass=='/section7'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section7' && 'car_active.png' || 'car.png'}}"><span>Verkeer</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section7') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<a href="#section6"><li ng-class="{ active: activeClass=='/section6'}"><img src="<?= $rootPath ?>images/newdesign/{{activeClass=='/section6' && 'velo_white.png' || 'velo.png'}}"><span>Velo</span><img class="pull-right" ng-src="<?=$rootPath?>/images/newdesign/{{isActive('/section6') && 'arrow_white.png' || 'arrow.png'}}"></li></a>
				<li></li>
			</ul>
		</div>
	</div>
	<!-- <section>
		<md-sidenav class="left1" md-component-id="left1">
			<div class="kha-logo-wrapper">
				<div ng-click="home(); closeSideNav(); toggleTrending('close'); enableFooter();" class="kha-logo">
					<img src="<?= $rootPath ?>images/newdesign/logo-small.png">
				</div>				
			</div>
			<div class="icon-titles">
				<ul>
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
	</section> -->

</div>