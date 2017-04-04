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
				<a ng-click="closeSideNav()" href="#section1/horeca/show/restaurant"><li><img src="images/newdesign/coffee.png"></li></a>
				<a ng-click="closeSideNav()" href="#section1/cultuur/show/gallerij"><li><img src="images/newdesign/film.png"></li></a>
				<a ng-click="closeSideNav()" href="#section1/over_de_stad/show/Openbare-diensten"><li><img src="images/newdesign/city.png"></li></a>
				<a ng-click="closeSideNav()" href="#section1/winkel/show/kleding"><li><img src="images/newdesign/sale.png"></li></a>
				<a ng-click="closeSideNav()" href="#section1/uitgaan/show/film"><li><img src="images/newdesign/pint.png"></li></a>
				<a ng-click="closeSideNav()" href="#section1/vrije_tijd/show/sport"><li><img src="images/newdesign/plane.png"></li></a>
				<a ng-click="closeSideNav()" href="#section8"><li><img src="images/newdesign/sun.png"></li></a>
				<a ng-click="closeSideNav()" href="#section7"><li><img src="images/newdesign/car.png"></li></a>
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
					<a ng-click="toggleLeft()" href="#section1/horeca/show/restaurant"><li>Horeca<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/cultuur/show/gallerij"><li>Cultuur<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/over_de_stad/show/Openbare-diensten"><li>Over de stad<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/winkel/show/kleding"><li>Shopping<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/uitgaan/show/film"><li>Uitgaan<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section1/vrije_tijd/show/sport"><li>Vrije tijd<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section8"><li>Weer<span class="pull-right">></span></li></a>
					<a ng-click="toggleLeft()" href="#section7"><li>Verkeer<span class="pull-right">></span></li></a>
				</ul>
			</div>
		</md-sidenav>
	</section>
</div>