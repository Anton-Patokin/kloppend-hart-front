app.controller("topTrendingController", function ($scope) {
    console.log('top trending is loaded');
    $scope.topTrendingList;
    $scope.trendingList;
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
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
    var endDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    hours = hours - 3;

    var startDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

 //    var x = document.getElementById("demo");

 //    if (navigator.geolocation) {
	//         navigator.geolocation.getCurrentPosition(showPosition);
	//     } else {
	//         x.innerHTML = "Geolocation is not supported by this browser.";
	//     }
	// function showPosition(position) {
	//     x.innerHTML = "Latitude: " + position.coords.latitude + 
	//     "<br>Longitude: " + position.coords.longitude; 
	// }

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position);
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

	function showPosition(position){
		if (error.code == error.PERMISSION_DENIED) {console.log(test)};
		// console.log(position);
		
	}

	function apiGetTrendingList(lat, lon, startDate, endDate){
		$.ajax({
			url: 'application/service/heatmap/getTrendingList/'+lat+'/'+lon+'/'+startDate+'/'+endDate,
			type: 'GET',
		    dataType: 'json',
		    async: true,
		    cache: false,
		    success: function(data) {
		    	console.log(data);
		    	if (data.length != 0) {$scope.trendingList = data} else {$scope.trendingList = false}
		    	
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});
	}

    $.ajax({
		url: 'application/service/heatmap/getTopTrendingList/'+startDate+'/'+endDate,
		type: 'GET',
	    dataType: 'json',
	    async: false,
	    cache: false,
	    success: function(data) {
		    $scope.topTrendingList = data;
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
	    }
	});
});