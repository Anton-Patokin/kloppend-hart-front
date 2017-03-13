var app = angular.module("myApp", ["ngRoute", 'uiGmapgoogle-maps']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/bla", {
            templateUrl: "sections/section0.php",
            controller: "londonCtrl"
        })
        .when("/section1", {
            templateUrl: "sections/section1.php",
            controller: "section1"
        })
        .when("/section2", {
            templateUrl: "sections/section2.php",
            controller: "section2"
        })
        .when("/section3", {
            templateUrl: "sections/section3.php",
            controller: "section3"
        })
        .when("/section4", {
            templateUrl: "sections/section4.php",
            controller: "section4"
        })
        .when("/section5", {
            templateUrl: "sections/section5.php",
            controller: "section5"
        })
        .when("/section6", {
            templateUrl: "sections/section6.php",
            controller: "section6"
        })
        .when("/section7", {
            templateUrl: "sections/section7.php",
            controller: "section7"
        })
        .when("/section8", {
            templateUrl: "sections/section8.php",
            controller: "section8"
        });
});

// app.controller("PrimeController", function ($scope, $http,$interval) {
//     // $scope.map = { center: { latitude: 51.218826, longitude: 4.402950 }, zoom: 14 };
//
//     $scope.map = {
//         center: {
//             latitude: 51.218826,
//             longitude: 4.402950
//         },
//         zoom: 14,
//         bounds: {
//             northeast: {
//                 latitude: 51.118826,
//                 longitude: 4.402950
//             },
//             southwest: {
//                 latitude: 51.318826,
//                 longitude: 4.002950
//             }
//         }
//     };
//     $scope.options = {
//         scrollwheel: false
//     };
//     var createRandomMarker = function (i, bounds, idKey) {
//         var lat_min = bounds.southwest.latitude,
//             lat_range = bounds.northeast.latitude - lat_min,
//             lng_min = bounds.southwest.longitude,
//             lng_range = bounds.northeast.longitude - lng_min;
//
//         if (idKey == null) {
//             idKey = "id";
//         }
//
//         var latitude = lat_min + (Math.random() * lat_range);
//         var longitude = lng_min + (Math.random() * lng_range);
//         var ret = {
//             latitude: latitude,
//             longitude: longitude,
//             title: 'm' + i
//         };
//         ret[idKey] = i;
//         return ret;
//     };
//     var markers_0 = [];
//     var markers_1 = [];
//     for (var i = 0; i < 50; i++) {
//         markers_0.push(createRandomMarker(i, $scope.map.bounds))
//         markers_1.push(createRandomMarker(i, $scope.map.bounds))
//     }
//
//     $scope.marker = {
//         randomMarkers_0: markers_0,
//         randomMarkers_1: markers_1,
//         icon_0: {url: "images/markers/marker_0.png"},
//         icon_1: {url: "images/markers/marker_111.png"},
//     }
//
//     $interval(Start, 100000);
//     function Start() {
//         var markers_0 = [];
//         var markers_1 = [];
//         for (var i = 0; i < 50; i++) {
//             markers_0.push(createRandomMarker(i, $scope.map.bounds))
//             markers_1.push(createRandomMarker(i, $scope.map.bounds))
//         }
//         $scope.marker = {
//             randomMarkers_0: markers_0,
//             randomMarkers_1: markers_1,
//             icon_0: {url: "images/markers/marker_0.png"},
//             icon_1: {url: "images/markers/marker_111.png"},
//         }
//     }
//
//
// });


app.controller("londonCtrl", function ($scope) {
    $scope.msg = "I love London";
});
// app.controller("section8", function ($scope, $interval) {
//     $interval(Start, 1000);
//     function Start() {
//         var tmp = new Date();
//         $scope.webcam = tmp.getTime();
//     }
// });
