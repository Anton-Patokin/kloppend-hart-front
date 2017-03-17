app.controller("section1", function ($scope, $routeParams) {
	var testVar = [];

	$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 }
    $scope.options = {scrollwheel: false};

	$scope.testVar = testVar;
	// console.log($scope.testVar);
	$scope.testVar2 = [
	    { y: "2017-03-14", a: 100, b: 90 },
	    { y: "2017-03-15", a: 75,  b: 65 },
	    { y: "2017-03-16", a: 50,  b: 40 },
	    { y: "2017-03-17", a: 75,  b: 65 },
	    { y: "2017-03-18", a: 50,  b: 40 },
	    { y: "2017-03-19", a: 75,  b: 65 },
	    { y: "2017-03-20", a: 100, b: 90 }
	];
	// console.log($scope.testVar2);

	$scope.testFunction = function(nid){
		console.log(nid);
		$.ajax({
			url: 'application/service/place/getPlaceInfoByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	console.log(data);
		    	$('.nodeTitle').empty();
		    	$('.nodeBody').empty();
		    	$('.nodeTitle').append(data['title']);
		    	$('.nodeBody').append(data['body']);
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});

		$.ajax({
			url: 'application/service/place/getPlaceStatsByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	console.log(data);
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
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }

		});

		$.ajax({
			url: 'application/service/place/getPlaceTotalMetricsByNid/'+nid,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	facebook = 0;
		    	apen = 0;
		    	foursquare = 0;
		    	$('.stats-analytics .apen-stats .apen-title').html('<h3>Apen</h3>');
		    	$('.stats-analytics .facebook-stats .facebook-title').html('<h3>Facebook</h3>');
		    	$('.stats-analytics .foursquare-stats .foursquare-title').html('<h3>Foursquare</h3>');

		    	console.log(data);
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

		// $('.angular-google-map-container').addClass('test');

		// $scope.options = {
		// 	scrollwheel: false
		// };


	}

	if ($routeParams.action == 'search') {
		$scope.testFunction($routeParams.value);
	}
});