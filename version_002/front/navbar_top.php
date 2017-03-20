<div class="top-navbar clearfix">
	<div class="social-media-checklist pull-left">
		<ul>
			<li><input type="checkbox" id="facebookCheck" ng-click="checkbox_social_media($event)" checked name="facebookCheck"><label for="facebookCheck">Facebook</label></li>
			<li><input type="checkbox" id="foursquareCheck" ng-click="checkbox_social_media($event)" checked name="foursquareCheck"><label for="foursquareCheck">Foursquare</label></li>
			<li><input type="checkbox" id="apenCheck" ng-click="checkbox_social_media($event)" checked name="apenCheck"><label for="apenCheck">Apen</label></li>
		</ul>
	</div>
	<div ng-controller="searchFormController" class="search-input col-md-4 pull-right">
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
	</div>
</div>