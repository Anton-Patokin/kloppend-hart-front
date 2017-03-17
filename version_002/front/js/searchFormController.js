app.controller("searchFormController", function ($scope) {
    console.log('tester search');

    $scope.searchNode=function(){
    	var searchResults = array();
        console.log('searching :');
        $.ajax({
			url: 'application/service/search/getSearchResults/'+$scope.searchInput,
			type: 'GET',
		    dataType: 'json',
		    async: false,
		    cache: false,
		    success: function(data) {
		    	console.log(data);
		    	for (var i = 0; i < 10; i++) {
		    		searchResults[] = data[i];
		    	}

		    	
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
		        console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
		    }
		});
    }
});