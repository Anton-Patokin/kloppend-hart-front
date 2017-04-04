app.controller("navTopTrendingController", function ($scope) {

    $scope.topTrendingList = [];
    $scope.trendingNearList = [];
    $scope.isTrending = false;
    var lon;
    var lat;

    var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1; //January is 0!
	var year = today.getFullYear();
	if(day<10){
	    day='0'+day;
	} 
	if(month<10){
	    month='0'+month;
	}
	// var hours = today.getHours();
	// var minutes = today.getMinutes();
	// var seconds = today.getSeconds();
	var hours = 23;
	var minutes = 59;
	var seconds = 59;
    var endDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    hours = hours - 23;
    minutes = minutes - 59;
    seconds = seconds - 59;

    var startDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			lon = position.coords.longitude;
			lat = position.coords.latitude;
			apiGetTrendingList(lat, lon, startDate, endDate);
		}, function(error){
			if (error.code == error.PERMISSION_DENIED) {
				$('#no-nearby-places').empty();
				$('#no-nearby-places').append('Please allow location');
			};
		});
	} else {
		lon = 4.402574;
		lat = 51.222045;
		apiGetTrendingList(lat, lon, startDate, endDate);
	}

	function apiGetTrendingList(lat, lon, startDate, endDate){
		$.ajax({
			url: 'heatmap/getTrendingList/'+lat+'/'+lon+'/'+startDate+'/'+endDate,
			type: 'GET',
		    dataType: 'Json',
		    async: true,
		    cache: false,
		    success: function(data) {
		    	// console.log(data);
		    	if (data.length != 0) {
		    		for (var i = 0; i < 5 ; i++) {
			    		$scope.trendingNearList.push(data[i]);
			    	} 
			    } else {
		    		$scope.trendingNearList = false
		    	};
		    	
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});
	}

    $.ajax({
		url: 'heatmap/getTopTrendingList/'+startDate+'/'+endDate,
		type: 'GET',
	    dataType: 'Json',
	    async: false,
	    cache: false,
	    success: function(data) {
	    	if (data.length != 0) {
	    		for (var i = 0; i < 5 ; i++) {
		    		$scope.topTrendingList.push(data[i]);
		    	}
	    	} else {
	    		$scope.topTrendingList = false;
	    	}
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
	    }
	});
});