app.controller("navTopTrendingController", function ($scope, $http) {

    $scope.topTrendingList = [];
    $scope.trendingNearList = [];
    $scope.isTrending = false;
    var lon;
    var lat;

    var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	if(day<10){
	    day='0'+day;
	} 
	if(month<10){
	    month='0'+month;
	}

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
		$http({
			method: 'GET',
			dataType: 'json',
			async: true,
			cache: false,
			url: 'heatmap/getTrendingList/'+lat+'/'+lon+'/'+startDate+'/'+endDate
			}).then(function successCallback(response) {
				data = response.data;
				if (data.length != 0) {
			    	counter = 0;
			    	for(poi in data){
			    		if ($scope.trendingNearList.length == 0) {
			    			$scope.trendingNearList.push(data[counter]);
			    		}
			    		if (counter > 0) {
			    			exists = false;
			    			for(trendingPoi in $scope.trendingNearList){
			    				if (data[counter].poi_id == $scope.trendingNearList[trendingPoi].poi_id) {
			    					exists = true;
			    				}
			    			}	
			    			if(!exists) {
		    					$scope.trendingNearList.push(data[counter]);
		    				}	    			
			    		}		    				    		
			    		counter++;
			    		if ($scope.trendingNearList.length == 5) {
			    			break;
			    		}
			    	}
		    	} else {
		    		$scope.trendingNearList = false;
		    	}
			}, function errorCallback(response) {
				console.log("Status: " + response);
		});
	}

	$http({
		method: 'GET',
		dataType: 'json',
		async: true,
		cache: false,
		url: 'heatmap/getTopTrendingList/'+startDate+'/'+endDate
		}).then(function successCallback(response) {
			data = response.data;
			if (data.length != 0) {
		    	counter = 0;
		    	for(poi in data){
		    		if ($scope.topTrendingList.length == 0) {
		    			$scope.topTrendingList.push(data[counter]);
		    		}
		    		if (counter > 0) {
		    			exists = false;
		    			for(trendingPoi in $scope.topTrendingList){
		    				if (data[counter].poi_id == $scope.topTrendingList[trendingPoi].poi_id) {
		    					exists = true;
		    				}
		    			}	
		    			if(!exists) {
	    					$scope.topTrendingList.push(data[counter]);
	    				}	    			
		    		}		    				    		
		    		counter++;
		    		if ($scope.topTrendingList.length == 5) {
		    			break;
		    		}
		    	}
	    	} else {
	    		$scope.topTrendingList = false;
	    	}
		}, function errorCallback(response) {
			console.log("Status: " + response);
	});
});