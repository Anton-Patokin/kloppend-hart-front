app.controller("section1", function ($scope, $routeParams, $http, $timeout) {
    var testVar = [];
    $scope.socialMediaStream;

    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680}, zoom: 4}
    $scope.options = {scrollwheel: false};

    $scope.testVar = testVar;
    $scope.loadInfo = false;
    $scope.loadChart = false;
    $scope.loadPhotos = false;
    $scope.loadMediaStream = false;
    $scope.imageExist;
    $scope.socialMediaItems;
    $scope.showSubcategories = true;

    $scope.myInterval = 6000;
    $scope.slides = [];

    $scope.filteredSocialMediaItems = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 4;
    $scope.maxSize = 5;

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };
    $scope.nextSlide = function () {
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };

    $scope.getPoiById = function (nid) {
        $scope.subNavBarActiveId = nid;
        console.log('subnavigatie id',$scope.subNavBarActiveId);
        $scope.loadInfo = true;
        $scope.loadChart = true;
        $scope.loadPhotos = true;
        $scope.loadMediaStream = true;

        $http({
            method: 'GET',
            dataType: 'json',
            async: true,
            cache: false,
            url: 'place/getPlaceInfoByNid/' + nid
        }).then(function successCallback(response) {
            data = response.data;
            $('.node-title').empty();
            $('.node-body').empty();
            $('.apen-link').empty();
            $('.node-title').append("<h1>" + data['title'].toUpperCase() + "</h1>");
            $('.node-title').append('<div class="small-seperator"></div>');
            $('.node-body').append(data['body']);
            $('.apen-link').append('<a href="https://apen.be/node/' + nid + '">Meer weten over ' + data['title'] + '<img src="https://apen.be/kloppend-hart-antwerpen/front/images/newdesign/arrow-black.png"></a>');

            $scope.loadInfo = false;
        }, function errorCallback(response) {
            console.log("Status: " + response);
        });

        $http({
            method: 'GET',
            dataType: 'json',
            async: true,
            cache: false,
            url: 'place/getPlaceStatsByNid/' + nid
        }).then(function successCallback(response) {
            data = response.data;
            testVar.length = 0
            for (metric in data) {
                var apenDif = 0;
                var apenTotal = 0;
                var facebookDif = 0;
                var facebookTotal = 0;
                var foursquareDif = 0;
                var foursquareTotal = 0;
                if ('apen' in data[metric] && data[metric]['apen']['total_differential'] != null) {
                    apenDif = data[metric]['apen']['total_differential']
                }
                ;
                if ('facebook' in data[metric] && data[metric]['facebook']['total_differential'] != null) {
                    facebookDif = data[metric]['facebook']['total_differential']
                }
                ;
                if ('foursquare' in data[metric] && data[metric]['foursquare']['total_differential'] != null) {
                    foursquareDif = data[metric]['foursquare']['total_differential']
                }
                ;
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
            url: 'place/getPlaceTotalMetricsByNid/' + nid
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
                    if (data[i]['metric_name'] == 'like') {
                        $('.stats-analytics .facebook-stats .facebook-likes').html(data[i]['total_value'] + ' likes')
                    }
                    if (data[i]['metric_name'] == 'checkin') {
                        $('.stats-analytics .facebook-stats .facebook-checkins').html(data[i]['total_value'] + ' chekins')
                    }
                    if (data[i]['metric_name'] == 'talking_about') {
                        $('.stats-analytics .facebook-stats .facebook-talking-abouts').html(data[i]['total_value'] + ' talking abouts')
                    }
                    facebook = facebook + Number(data[i]['total_value']);
                }
                if (data[i]['source_name'] == 'foursquare') {
                    if (data[i]['metric_name'] == 'checkin') {
                        $('.stats-analytics .foursquare-stats .foursquare-checkins').html(data[i]['total_value'] + ' checkins')
                    }
                    if (data[i]['metric_name'] == 'user') {
                        $('.stats-analytics .foursquare-stats .foursquare-users').html(data[i]['total_value'] + ' users')
                    }
                    foursquare = foursquare + Number(data[i]['total_value']);
                }
                if (data[i]['source_name'] == 'apen') {
                    if (data[i]['metric_name'] == 'visit') {
                        $('.stats-analytics .apen-stats .apen-visits').html(data[i]['total_value'] + ' visits')
                    }
                    apen = apen + Number(data[i]['total_value']);
                }
            }
            if (facebook == 0) {
                $('.stats-analytics .facebook-stats .facebook-total').html('N/A');
                // $('.stats-analytics .facebook-stats').addClass('not-available');
            } else {
                $('.stats-analytics .facebook-stats .facebook-total').html('total ' + facebook);
            }

            if (apen == 0) {
                $('.stats-analytics .apen-stats .apen-total').html('N/A');
                // $('.stats-analytics .apen-stats').addClass('not-available');
            } else {
                $('.stats-analytics .apen-stats .apen-total').html('total ' + apen);
            }

            if (foursquare == 0) {
                $('.stats-analytics .foursquare-stats .foursquare-total').html('N/A');
                // $('.stats-analytics .foursquare-stats').addClass('not-available');
            } else {
                $('.stats-analytics .foursquare-stats .foursquare-total').html('total ' + foursquare);
            }
        }, function errorCallback(response) {
            console.log("Status: " + response);
        });

        $http({
            method: 'GET',
            dataType: 'json',
            async: true,
            cache: false,
            url: 'place/getSocialMediaStreamByNid/' + nid
        }).then(function successCallback(response) {
            data = response.data;
            $scope.socialMediaItems = data.foursquare;
            if ($scope.socialMediaItems != null && $scope.socialMediaItems.length > 0) {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;
                $scope.filteredSocialMediaItems = $scope.socialMediaItems.slice(begin, end);
            } else {
                $scope.filteredSocialMediaItems = [];
                $scope.socialMediaItems = false;
            }
            $scope.loadMediaStream = false;
        }, function errorCallback(response) {
            console.log("Status: " + response);
        });

        function imageExists(url, callback) {
            var img = new Image();
            img.onload = function () {
                callback(url, true);
            };
            img.onerror = function () {
                callback(url, false);
            };
            img.src = url;
        }

        $http({
            method: 'GET',
            dataType: 'json',
            async: true,
            cache: false,
            url: 'place/getSocialMediaPhotos/' + nid
        }).then(function successCallback(response) {
            data = response.data;
            $('.photo-info').empty();
            $scope.slides = [];
            if (data.foursquare.length != 0) {
                for (var i = data.foursquare.length - 1; i >= 0; i--) {
                    imageExists(data.foursquare[i].url, function (url, exists) {
                        if (exists) {
                            photo = {image: url};
                            $scope.slides.push(photo);
                        }
                    });
                }
            } else {
                $('.photo-info').append('<p class="temp-photo">Er zijn geen foto\'s van deze plaats.</p>');
                $scope.slides = false;
            }

            $scope.loadPhotos = false;
        }, function errorCallback(response) {
            console.log("Status: " + response);
        });
    }

    $scope.toggleSubcategories = function () {
        $scope.showSubcategories = !$scope.showSubcategories;
    }

    $scope.$watch('currentPage + numPerPage', function () {
        if ($scope.socialMediaItems != null && $scope.socialMediaItems.length > 0) {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            $scope.filteredSocialMediaItems = $scope.socialMediaItems.slice(begin, end);
        }
    });

    if ($routeParams.action == 'search') {
        $scope.getPoiById($routeParams.value);
    }
});