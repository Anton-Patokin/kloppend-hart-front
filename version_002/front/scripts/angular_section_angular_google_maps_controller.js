app.controller("PrimeController", function ($scope, $http,$interval) {
    // $scope.map = { center: { latitude: 51.218826, longitude: 4.402950 }, zoom: 14 };

    $scope.map = {
        center: {
            latitude: 51.218826,
            longitude: 4.402950
        },
        zoom: 14,
        bounds: {
            northeast: {
                latitude: 51.118826,
                longitude: 4.402950
            },
            southwest: {
                latitude: 51.318826,
                longitude: 4.002950
            }
        }
    };
    $scope.options = {
        scrollwheel: false
    };
    var createRandomMarker = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i
        };
        ret[idKey] = i;
        return ret;
    };
    var markers_0 = [];
    var markers_1 = [];
    for (var i = 0; i < 50; i++) {
        markers_0.push(createRandomMarker(i, $scope.map.bounds))
        markers_1.push(createRandomMarker(i, $scope.map.bounds))
    }

    $scope.marker = {
        randomMarkers_0: markers_0,
        randomMarkers_1: markers_1,
        icon_0: {url: "images/markers/marker_0.png"},
        icon_1: {url: "images/markers/marker_111.png"},
    }

    $interval(Start, 100000);
    function Start() {
        var markers_0 = [];
        var markers_1 = [];
        for (var i = 0; i < 50; i++) {
            markers_0.push(createRandomMarker(i, $scope.map.bounds))
            markers_1.push(createRandomMarker(i, $scope.map.bounds))
        }
        $scope.marker = {
            randomMarkers_0: markers_0,
            randomMarkers_1: markers_1,
            icon_0: {url: "images/markers/marker_0.png"},
            icon_1: {url: "images/markers/marker_111.png"},
        }
    }


});