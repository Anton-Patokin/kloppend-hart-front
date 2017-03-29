<!-- <div class="navbar navbar-inverse navbar-fixed-left">
	<a ng-click="enableScroll()" class="navbar-brand" href="#">Brand</a>
	<ul class="nav navbar-nav">
		<li><a href="#section1/horeca/show/restaurant" class="main-menu section-001"><span>Horeca</span></a></li>
		<li><a href="#section1/cultuur/show/gallerij" class="main-menu section-001"><span>Cultuur</span></a></li>
		<li><a href="#section1/over_de_stad/show/Openbare-diensten" class="main-menu section-001"><span>Over de stad</span></a></li>
		<li><a href="#section1/winkel/show/kleding" class="main-menu section-001"><span>Shopping</span></a></li>
		<li><a href="#section1/uitgaan/show/film" class="main-menu section-001"><span>Uitgaan</span></a></li>
		<li><a href="#section1/vrije_tijd/show/sport" class="main-menu section-001"><span>Vrije tijd</span></a></li>
		<li><a href="#section7" class="main-menu section-007"><span>Verkeer</span></a></li>        
		<li><a href="#section8" class="main-menu section-008"><span>Weer</span></a></li>
		<li><a href="#sectionvelo" class="main-menu section-010"><span>Velo</span></a></li>
	</ul>
</div> -->
<div ng-controller="SideBarController">
	<div class="navbar navbar-inverse navbar-fixed-left sidenav">
		<div ng-click="toggleLeft()" class="hamburger-icon">
			<img src="images/newdesign/hamburger.png">
		</div>
		<div class="title">
		 	<img ng-click="home(); toggleTrending('close'); enableFooter();" src="images/newdesign/apenCityboard.png">
		</div>
		<div class="icons">
			<ul>
				<a href="#section1/horeca/show/restaurant"><li><img src="images/newdesign/coffee.png"></li></a>
				<a href="#section1/cultuur/show/gallerij"><li><img src="images/newdesign/film.png"></li></a>
				<a href="#section1/over_de_stad/show/Openbare-diensten"><li><img src="images/newdesign/city.png"></li></a>
				<a href="#section1/winkel/show/kleding"><li><img src="images/newdesign/sale.png"></li></a>
				<a href="#section1/uitgaan/show/film"><li><img src="images/newdesign/car.png"></li></a>
				<a href="#section1/vrije_tijd/show/sport"><li><img src="images/newdesign/plane.png"></li></a>
				<a href="#section7"><li><img src="images/newdesign/sun.png"></li></a>
				<li></li>
			</ul>
		</div>
	</div>
	<section>
		<md-sidenav class="left1" md-component-id="left1">
			<div class="kha-logo-wrapper">
				<div class="kha-logo">
					
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
					<a ng-click="toggleLeft()" href="#section1/horeca/show/restaurant"><li>Horeca<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/cultuur/show/gallerij"><li>Cultuur<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/over_de_stad/show/Openbare-diensten"><li>Over de stad<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/winkel/show/kleding"><li>Shopping<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/uitgaan/show/film"><li>Verkeer<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/vrije_tijd/show/sport"><li>Vrije tijd<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section7"><li>Weer<span class="pull-right">></span></li></a>
				</ul>
			</div>
		</md-sidenav>
	</section>
	
</div>