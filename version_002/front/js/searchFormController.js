app.controller("searchFormController", function ($scope, $timeout, $http) {

    
    $scope.searchNode = function () {
        $scope.searchResults = [];
        $scope.showResults;
        $scope.dropdown = function () {
            $timeout(function () {
                $scope.showResults = false;
                document.getElementById("search-input").blur();
            }, 300);
        };

        $http({
            method: 'GET',
            dataType: 'json',
            async: true,
            cache: false,
            url: 'search/getSearchResults/' + $scope.searchInput
        }).then(function successCallback(response) {
            data = response.data;
            if ($scope.searchInput != '') {
                $scope.showResults = true;
                for (var i = 0; i < 10; i++) {
                    if (data[i] != null) {
                        $scope.searchResults.push(data[i]);
                    }
                }
            } else {
                $scope.showResults = false;
                $scope.searchResults = [];
            }
        }, function errorCallback(response) {
            console.log("Status: " + response);
        });
    }
});