app.controller("topTrendingController", function ($scope) {
    console.log('top trending is loaded');
    $scope.topTrendingList;

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

    $.ajax({
		url: 'application/service/heatmap/getTopTrendingList/'+startDate+'/'+endDate,
		type: 'GET',
	    dataType: 'json',
	    async: false,
	    cache: false,
	    success: function(data) {
	    	console.log(data);
		    	$scope.topTrendingList = data;
	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
	    }
	});
});