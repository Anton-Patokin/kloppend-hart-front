<div class="top-navbar clearfix">
	<div class="social-media-checklist pull-left">
		<ul>
			<li><input type="checkbox" name="facebookCheck">Facebook</li>
			<li><input type="checkbox" name="foursquareCheck">Foursquare</li>
			<li><input type="checkbox" name="apenCheck">Apen</li>
		</ul>
	</div>
	<div ng-controller="searchFormController" class="search-input col-md-4 pull-right">
		<div class="input-group">
			<input ng-model="searchInput" ng-keyup="searchNode()"  type="text" class="form-control" name="searchInput">
			<span class="input-group-btn">
				<button class="btn btn-search" type="submit">Search</button>
			</span>
		</div>
		<div class="results">
			<ul></ul>
		</div>
	</div>
</div>