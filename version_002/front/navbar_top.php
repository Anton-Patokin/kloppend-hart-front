<?php
	$date = date('l\, d M Y', time());
?>

<div ng-controller="navTopTrendingController" class="top-navbar clearfix">
	<div class="social-media-checklist pull-left">
		<ul>
			<li class="date"><?= strtoupper($date) ?></li>
			<li><span ng-click="dropdownToggle = !dropdownToggle">TRENDING</span>
				<ul id="trending-wrapper" ng-class="{'dropdownTest' : !dropdownToggle, 'dropdownShow' : dropdownToggle}">
					<div class="top-trending">
						<div class="trending-now">
							<h4>Top trending op deze moment:</h4>
							<ul>
								<a ng-repeat="(key, poi) in topTrendingList" href="#section1/top/search/{{poi.nid}}"><li><span class="place">00{{ key + 1 }}.</span>{{ poi.name }}</li></a>
							</ul>
						</div>
						<div class="trending-near">
							<h4>Top trending dichtbij u:</h4>
							<ul>
								<a ng-show="trendingNearList" ng-repeat="(key, poi) in trendingNearList" href="#section1/top/search/{{poi.nid}}"><li><span class="place">00{{ key + 1 }}.</span>{{ poi.name }}</li></a>
								<li ng-hide="trendingNearList">Er zijn geen plaatsen in uw buurt</li>
							</ul>

						</div>
					</div>
				</ul>
			</li>

			<li>HOTSPOTS</li>
			<li>
				<input type="checkbox" id="facebookCheck" class="regular-checkbox" name="facebookCheck" ng-click="checkbox_social_media($event)" checked /><label for="facebookCheck"></label><label for="facebookCheck">FACEBOOK</label>
			</li>
			<li>
				<input type="checkbox" id="foursquareCheck" class="regular-checkbox" name="foursquareCheck" ng-click="checkbox_social_media($event)" checked /><label for="foursquareCheck"></label><label for="foursquareCheck">FOURSQUARE</label>
			</li>
			<li>
				<input type="checkbox" id="apenCheck" class="regular-checkbox" name="apenCheck" ng-click="checkbox_social_media($event)" checked /><label for="apenCheck"></label><label for="apenCheck">APEN</label>
			</li>
		</ul>
	</div>
	<div class="search-input pull-right">
		<ul>
			<li>
				<input type="text" name="search" placeholder="search...">
			</li>
			<li>
				<p class="btn-search"><img src="images/newdesign/search.png"></p>
			</li>
		</ul>
	</div>
<!-- 	<div ng-controller="searchFormController" class="search-input col-md-4 pull-right">
		<div class="input-group">
			<input ng-model="searchInput" ng-blur="dropdown()" ng-focus="showResults=true" ng-keyup="searchNode()"  type="text" class="form-control" name="searchInput">
			<span class="input-group-btn">
				<button class="btn btn-search" type="submit">Search</button>
			</span>
		</div>
		<div ng-show="showResults" class="results col-md-11">
			<ul>
				<a ng-repeat="searchResult in searchResults" href=#section1/test/search/{{searchResult['nid']}}><li>{{searchResult['name']}}</li></a>
			</ul>
		</div>
	</div> -->
</div>