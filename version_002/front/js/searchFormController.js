app.controller("searchFormController", function ($scope, $timeout) {
	console.log('tester search');

	$scope.searchNode=function(){
		$scope.searchResults = [];
		$scope.showResults;
		$scope.dropdown = function() {
			$timeout(function(){
				console.log($scope.showResults);
				$scope.showResults = false;
			}, 300);
		};
		console.log('searching :');
		$.ajax({
			url: 'search/getSearchResults/'+$scope.searchInput,
			type: 'GET',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(data) {
				if ($scope.searchInput != '') {
					$scope.showResults = true;
					for (var i = 0; i < 10; i++) {
						if (data[i] != null) {$scope.searchResults.push(data[i]);}		    		
					}
					console.log($scope.searchResults);
				} else {
					$scope.showResults = false;
					$scope.searchResults = [];
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Status: " + textStatus); console.log("Error: " + errorThrown); 
			}
		});
	}
});