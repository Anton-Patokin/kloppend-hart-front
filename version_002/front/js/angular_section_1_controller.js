app.controller("section1", function ($scope, $routeParams, $http) {
	var testVar = [];
	$scope.socialMediaStream;

	$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 }
    $scope.options = {scrollwheel: false};

	$scope.testVar = testVar;
	$scope.loadInfo = false;
	$scope.loadChart = false;
	$scope.loadPhotos = false;
	$scope.imageExist;
	$scope.socialMediaItems;

	$scope.myInterval = 6000;
 	$scope.slides = [];

 	$scope.filteredSocialMediaItems = [];
 	$scope.currentPage = 1;
	$scope.numPerPage = 4;
	$scope.maxSize = 5;

 	$scope.$watch('currentPage + numPerPage', function() {
		var begin = (($scope.currentPage - 1) * $scope.numPerPage)
		, end = begin + $scope.numPerPage;

		$scope.filteredSocialMediaItems = $scope.socialMediaItems.slice(begin, end);
	});

	$scope.getPoiById = function(nid){
		$scope.loadInfo = true;
		$scope.loadChart = true;
		$scope.loadPhotos = true;

		$http({
			method: 'GET',
			dataType: 'json',
			async: true,
			cache: false,
			url: 'application/service/place/getPlaceInfoByNid/'+nid
			}).then(function successCallback(response) {
				data = response.data;
				$('.node-title').empty();
		    	$('.node-body').empty();
		    	$('.apen-link').empty();
		    	$('.node-title').append(data['title'].toUpperCase());
		    	$('.node-title').append('<div class="small-seperator"></div>');
		    	$('.node-body').append(data['body']);
		    	$('.apen-link').append('<a href="https://apen.be/node/' + nid + '">Meer weten over ' + data['title'] + '<img src="images/newdesign/arrow-black.png"></a>');

		    	$scope.loadInfo = false;
			}, function errorCallback(response) {
				console.log("Status: " + response);
		});

		// $.ajax({
		// 	url: 'application/service/place/getPlaceImageByNid/'+nid+'/_original',
		// 	type: 'GET',
		//     dataType: 'json',
		//     async: true,
		//     cache: false,
		//     success: function(data) {
		//     	console.log('IMAGE: ', data);
		//     	if (data) {
		//     		photo = data.filepath;
		//     	} else {
		//     		photo = "sites/all/themes/zen/apen/site-images/img-logo.png";
		//     	}
		//     	$('.poi-photo-wrapper').empty();
		//     	$('.poi-photo-wrapper').append('<img src="https://apen.be/'+ photo +'">');
		//     },
		//     error: function(XMLHttpRequest, textStatus, errorThrown) { 
		//         console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		//     }
		// });

		$http({
			method: 'GET',
			dataType: 'json',
			async: true,
			cache: false,
			url: 'application/service/place/getPlaceStatsByNid/'+nid
			}).then(function successCallback(response) {
				data = response.data;
				testVar.length = 0
		    	for(metric in data){	    		
		    		var apenDif = 0;
		    		var apenTotal = 0;
		    		var facebookDif = 0;
		    		var facebookTotal = 0;
		    		var foursquareDif = 0;
		    		var foursquareTotal = 0;
		    		if ('apen' in data[metric] && data[metric]['apen']['total_differential'] != null) {apenDif = data[metric]['apen']['total_differential']};
		    		if ('facebook' in data[metric] && data[metric]['facebook']['total_differential'] != null) {facebookDif = data[metric]['facebook']['total_differential']};
		    		if ('foursquare' in data[metric] && data[metric]['foursquare']['total_differential'] != null) {foursquareDif = data[metric]['foursquare']['total_differential']};
		    		numbers = {y: metric, a: apenDif, b: facebookDif, c: foursquareDif};
		    		testVar.push(numbers);

		    	}
		    	$('#morris-analytics').empty();
				Morris.Line({
					element: 'morris-analytics',
					data: testVar,
					xkey: 'y',
					ykeys: ["a", "b", "c"],
					lineColors: ["#de7f22", "#19A5B4", "#d5da47"],
					labels: ["Apen", "Facebook", "Foursquare"],
					pointSize: 4,
				});

		    	$scope.loadChart = false;
			}, function errorCallback(response) {
				console.log("Status: " + response);
		});

		$http({
			method: 'GET',
			dataType: 'json',
			async: true,
			cache: false,
			url: 'application/service/place/getPlaceTotalMetricsByNid/'+nid
			}).then(function successCallback(response) {
				data = response.data;
				facebook = 0;
		    	apen = 0;
		    	foursquare = 0;
		    	$('.stats-analytics .apen-stats .apen-title').html('<h3>Apen</h3>');
		    	$('.stats-analytics .facebook-stats .facebook-title').html('<h3>Facebook</h3>');
		    	$('.stats-analytics .foursquare-stats .foursquare-title').html('<h3>Foursquare</h3>');

		    	for (var i in data) {
		    		if (data[i]['source_name'] == 'facebook') {
		    			if (data[i]['metric_name'] == 'like') {$('.stats-analytics .facebook-stats .facebook-likes').html(data[i]['total_value']+' likes')}
		    			if (data[i]['metric_name'] == 'checkin') {$('.stats-analytics .facebook-stats .facebook-checkins').html(data[i]['total_value']+' chekins')}
		    			if (data[i]['metric_name'] == 'talking_about') {$('.stats-analytics .facebook-stats .facebook-talking-abouts').html(data[i]['total_value']+' talking abouts')}
		    			facebook = facebook + data[i]['total_value'];
		    		}
		    		if (data[i]['source_name'] == 'foursquare') {
		    			if (data[i]['metric_name'] == 'checkin') {$('.stats-analytics .foursquare-stats .foursquare-checkins').html(data[i]['total_value']+' checkins')}
		    			if (data[i]['metric_name'] == 'user') {$('.stats-analytics .foursquare-stats .foursquare-users').html(data[i]['total_value']+' users')}
		    			foursquare = foursquare + data[i]['total_value'];
		    		}
		    		if (data[i]['source_name'] == 'apen') {
		    			if (data[i]['metric_name'] == 'visit') {$('.stats-analytics .apen-stats .apen-visits').html(data[i]['total_value']+' visits')}
		    			apen = apen + data[i]['total_value'];
		    		}
		    	}
		    	if(facebook == 0){
		           $('.stats-analytics .facebook-stats .facebook-total').html('N/A'); 
		           // $('.stats-analytics .facebook-stats').addClass('not-available');
		        }else{
		           $('.stats-analytics .facebook-stats .facebook-total').html('total ' + facebook); 
		        }
		        
		        if(apen == 0){
		           $('.stats-analytics .apen-stats .apen-total').html('N/A'); 
		           // $('.stats-analytics .apen-stats').addClass('not-available');
		        }else{
		           $('.stats-analytics .apen-stats .apen-total').html('total ' + apen); 
		        }
		        
		        if(foursquare == 0){
		           $('.stats-analytics .foursquare-stats .foursquare-total').html('N/A'); 
		           // $('.stats-analytics .foursquare-stats').addClass('not-available');
		        }else{
		           $('.stats-analytics .foursquare-stats .foursquare-total').html('total ' + foursquare); 
		        }
			}, function errorCallback(response) {
				console.log("Status: " + response);
		});

		// $http({
		// 	method: 'GET',
		// 	dataType: 'json',
		// 	async: false,
		// 	cache: false,
		// 	url: 'application/service/place/getSocialMediaStreamByNid/'+nid
		// 	}).then(function successCallback(response) {
		// 		data = response.data;
		// 		$scope.socialMediaItems = data.foursquare;
		// 		console.log('SOCIAL MEDIA ITEMS: ', data);
		// 	}, function errorCallback(response) {
		// 		console.log("Status: " + response);
		// });

		$.ajax({
			url: 'application/service/place/getSocialMediaStreamByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	$scope.socialMediaItems = data.foursquare;
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});

		function imageExists(url, callback) {
			var img = new Image();
			img.onload = function() { callback(url, true); };
			img.onerror = function() { callback(url, false); };
			img.src = url;
		}

		$http({
			method: 'GET',
			dataType: 'json',
			async: true,
			cache: false,
			url: 'application/service/place/getSocialMediaPhotos/'+nid
			}).then(function successCallback(response) {
				data = response.data;
				$('.temp-photo').empty();
		    	// console.log(data);
		    	if (data.foursquare.length != 0) {
			    	for (var i = data.foursquare.length - 1; i >= 0; i--) {
			    		imageExists(data.foursquare[i].url, function(url, exists) {
							if (exists) {
								photo = {image: url};
								$scope.slides.push(photo);	
							}
						});	
			    	}
		    	} else {
		    		console.log()
		    		$('.temp-photo').append('Er is geen foto van deze plaats');
		    	}

		    	$scope.loadPhotos = false;
			}, function errorCallback(response) {
				console.log("Status: " + response);
		});

	}

	if ($routeParams.action == 'search') {
		$scope.getPoiById($routeParams.value);
	}
});