app.controller("section1", function ($scope, $routeParams, $animate) {
	var testVar = [];
	$scope.socialMediaStream;

	$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 }
    $scope.options = {scrollwheel: false};

	$scope.testVar = testVar;
	$scope.loadInfo = false;
	$scope.loadChart = false;

	
	var element = document.getElementsByClassName("poi-photo-wrapper");
	$animate.enabled(false, element);
	$scope.myInterval = 3000;
 	$scope.slides = [];

	$scope.getPoiById = function(nid){
		$scope.loadInfo = true;
		$scope.loadChart = true;
		$.ajax({
			url: 'application/service/place/getPlaceInfoByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: true,
		    cache: false,
		    success: function(data) {
		    	// console.log('POI DATA: ', data);
		    	$('.node-title').empty();
		    	$('.node-body').empty();
		    	$('.apen-link').empty();
		    	$('.node-title').append(data['title'].toUpperCase());
		    	$('.node-title').append('<div class="small-seperator"></div>');
		    	$('.node-body').append(data['body']);
		    	$('.apen-link').append('<a href="https://apen.be/node/' + nid + '">Meer weten over ' + data['title'] + '<img src="images/newdesign/arrow-black.png"></a>');
		    	$scope.$apply(function(){
		    		$scope.loadInfo = false;
		    	});
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
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

		$.ajax({
			url: 'application/service/place/getPlaceStatsByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: true,
		    cache: false,
		    success: function(data) {
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
				$scope.$apply(function(){
		    		$scope.loadChart = false;
		    	});
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }

		});

		$.ajax({
			url: 'application/service/place/getPlaceTotalMetricsByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: true,
		    cache: false,
		    success: function(data) {
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
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});

		// $.ajax({
		// 	url: 'application/service/place/getSocialMediaStreamByNid/'+nid,
		// 	type: 'GET',
		//     dataType: 'json',
		//     async: false,
		//     cache: false,
		//     success: function(data) {
		//     	$scope.socialMediaStream = data;
		//     	$scope.loading = false;
		//     },
		//     error: function(XMLHttpRequest, textStatus, errorThrown) { 
		//         console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		//     }
		// });

		function imageExists(url, callback) {
			var img = new Image();
			img.onload = function() { callback(true); };
			img.onerror = function() { callback(false); };
			img.src = url;
			}

		$.ajax({
			url: 'application/service/place/getSocialMediaPhotos/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	// $scope.socialMediaStream = data;
		    	// $scope.loading = false;
		  //   	console.log('Photos: ', data)
		  //   	photo = data.foursquare[1].url;
		  //   	imageExists(photo, function(exists) {
				// 	if (true) {

				// 	}
				// });
		    	// $('.poi-photo-wrapper').empty();
		    	// $('.poi-photo-wrapper').append('<img src="'+ photo +'">');
		    	// console.log(data.foursquare[1].url);
		    	for (var i = data.foursquare.length - 1; i >= 0; i--) {
		    		photo = {image: data.foursquare[i].url};
		    		imageExists(data.foursquare[i].url, function(exists) {

						if (exists) {
							console.log("photoooo: ", photo);
							$scope.slides.push(photo);
						}
					});		    		
		    	}
		    	
		    	console.log('test ', $scope.slides);
		    	// console.log($scope.slides);
		    	// console.log("image: ", $scope.slides);

		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});
	}

	if ($routeParams.action == 'search') {
		$scope.getPoiById($routeParams.value);
	}
});