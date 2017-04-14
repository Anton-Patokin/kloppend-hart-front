<?php
	$rootPath = "https://apen.be/kloppend-hart-antwerpen/front/";
?>
<div ng-init='disableSroll(<?= ($show=="search"&&isset($cafe))? $cafe: "";?>);hideVelo(); disableFooter();toggle_show_traffic(false);' class="section-wrapper">
	<?php if($show == 'show'): ?>
		<div class="row subcategories-menu-wrapper">
			<div class="col-md-12 subcategories-menu">
				<ul>
					<?php foreach($subcategories as $key => $subcategory): ?>
						<?php if($key == 0): ?><a ng-click="toggleSubcategories()"><li><span ng-hide="showSubcategories">Open</span><span ng-show="showSubcategories">Close</span> subcategories</li></a><?php endif ?>
						<a ng-show="showSubcategories" href="#section1/<?= $getCategory ?>/show/<?= $subcategory['link'] ?>"><li class="<?= (strtolower($subcategory['link']) == strtolower($getSubcategory))? 'subcategory-active' : '' ?> <?= (($key % 2) == 0) ? 'even' : 'oneven' ;?>"><?= $subcategory['database'] ?><span class="subcategory-arrow pull-right"><img src="<?= (strtolower($subcategory['link']) == strtolower($getSubcategory))? $rootPath.'images/newdesign/arrow-active.png' : $rootPath.'images/newdesign/arrow.png' ?>"></span></li></a>
						<ul ng-show="showSubcategories">
							<?php if(strtolower($subcategory['link']) == strtolower($getSubcategory)): ?>
								<?php if(isset($topPlaces) && count($topPlaces) > 0): ?>
									<?php for ($i=0; $i < 10; $i++): ?>
										<?php if(isset($topPlaces[$i])): ?>
											<!-- <a href="#section1/<?= $getCategory ?>/<?= $subcategory['link'] ?>/<?= $topPlaces[$i]->nid ?>"><li><?= $topPlaces[$i]->name ?></li></a> -->
											<p ng-class="{'active':subNavBarActiveId=='<?=$topPlaces[$i]->nid?>' }" <?= ($i == 0)? 'ng-init="getPoiById('. $topPlaces[$i]->nid .'); disableSroll('. $topPlaces[$i]->nid .')"' : "" ?>  class="detail-top-place" ng-click="getPoiById(<?= $topPlaces[$i]->nid ?>);getNearbyPlaceses(<?= $topPlaces[$i]->nid ?>)" ><span class="place"><?= ($i == 9)? '0' : '00' ?><?= $i + 1 ?>.</span><?= $topPlaces[$i]->name ?><span class="subcategory-arrow pull-right"><img ng-show="subNavBarActiveId=='<?=$topPlaces[$i]->nid?>'" src="<?=$rootPath?>/images/newdesign/arrow_white.png"></span></p>
										<?php endif ?>
									<?php endfor ?>
									<?php else: ?>
										<li>Geen plaatsen</li>
									<?php endif ?>
							<?php endif ?>
						</ul>
					<?php endforeach ?>
				</ul>
				<?= $message ?>
			</div>
		</div>
	<?php endif ?>
	<div class="<?= ($show == 'show')? '' : 'poi-search-details'?> poi-details-wrapper clearfix">
		<div ng-class="{'sidenav-open' : !sideNavtest}" class="poi-details">

			<div class="col-md-6">
				<div class="col-md-12 clearfix">
					<div class="poi-text ">
						<div ng-show="loadInfo" layout="row" layout-sm="column" layout-align="space-around">
							<md-progress-circular md-mode="indeterminate"></md-progress-circular>
						</div>
						<div class="node-title">
						</div>
						<div class="node-body">
						</div>
						<div class="apen-link">
						</div>
					</div>
				</div>
				<div class="poi-chart">
					<div class="col-md-12 clearfix">
						<div class="">
							<div id="morris-analytics">
								<div ng-show="loadChart" layout="row" layout-sm="column" layout-align="space-around">
									<md-progress-circular md-mode="indeterminate"></md-progress-circular>
								</div>
							</div>
							<div class="stats-analytics clearfix">
								<div class="apen-stats col-md-4">
									<div class="apen-title">
									</div>
									<div class="apen-total">
									</div>
									<div class="apen-visits">
									</div>
								</div>
								<div class="facebook-stats col-md-4">
									<div class="facebook-title">
									</div>
									<div class="facebook-total">
									</div>
									<div class="facebook-likes">
									</div>
									<div class="facebook-checkins">
									</div>
									<div class="facebook-talking-abouts">
									</div>
								</div>
								<div class="foursquare-stats col-md-4">
									<div class="foursquare-title">
									</div>
									<div class="foursquare-total">
									</div>
									<div class="foursquare-checkins">
									</div>
									<div class="foursquare-users">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="col-md-12 clearfix">
					<div class="poi-photo-wrapper">
						<div ng-show="loadPhotos" layout="row" layout-sm="column" layout-align="space-around">
							<md-progress-circular md-mode="indeterminate"></md-progress-circular>
						</div>
						<img class="slide slide-animation" ng-class="{'show' : isCurrentSlideIndex($index)}" ng-hide="!isCurrentSlideIndex($index)" ng-repeat="slide in slides" ng-src="{{ slide.image }}">
						<div ng-show="slides" class="left-arrow" ng-click="nextSlide()"><img src="<?= $rootPath ?>images/newdesign/arrow-black-prev.png"></div>
    					<div ng-show="slides" class="right-arrow" ng-click="prevSlide()"><img src="<?= $rootPath ?>images/newdesign/arrow-black.png"></a></div>
    					<div class="photo-info"></div>
					</div>
				</div>
				<div class="col-md-12">
					<div class="social-media-stream clearfix">
						<div ng-show="socialMediaItems" ng-repeat="socialMediaItem in filteredSocialMediaItems" class="social-media-item col-md-12">
							<div class="user-photo col-md-3">
								<img src="{{ socialMediaItem.photo }}">
							</div>
							<div class="user-name col-md-9">
								<div class="col-md-12">
									<h4>{{ socialMediaItem.first_name }} {{ socialeMediaItem.last_name }}</h4>
								</div>
								<div class="user-text col-md-12">
									<p>{{ socialMediaItem.text }}</p>
									<p class="date pull-right">{{ socialMediaItem.created_at }}</p>
								</div>
							</div>
						</div>
						<div ng-show="socialMediaItems" class="col-md-12 pagination">
							<pagination 
							  page="currentPage"
							  total-items="socialMediaItems.length"
							  max-size="maxSize"  
							  boundary-links="true"
							  items-per-page="numPerPage">
							</pagination>
						</div>
						<div ng-hide="socialMediaItems" class="no-social-media-items">
							<p>Er is geen social media stream beschikbaar.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>