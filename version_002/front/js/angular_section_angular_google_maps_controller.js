app.controller("PrimeController", function ($scope, $http, $interval, $timeout) {
    // var showHeatmapBool = true;
    // var showMarkersBool = true;
    $scope.showHeatmapBool = {visible: true};
    $scope.showMarkerBool = {visible: false};
    var $slide;

//application states
    var APP_STATE_LOAD_MAP = 0;
    var APP_STATE_LOAD_CURRENT_HOUR = 1;
    var APP_STATE_LOAD_DATA = 2;
    var APP_STATE_DISPLAY_DATA = 3;
    var APP_STATE_LOAD_FUTURE_DATA = 4;

    var loaded;

//general variables
    var map;
    var heatmap;
    var heatmapData = [];
    var markersArray = [];
    $scope.heatmepData = [];

//default date values
    var start_time = 0;
    var end_time = 0;

//heatmap Settings
    var center;
    var markerOffset = 17;
    var heatMapRadius = 35;

    var markerCluster;
    var loadAjaxConnections = 0;

//default application state
    var currentAppState = 0;
    var currentAppStateFunction = null;

    var date = new Date();
    var startHour = date.getHours() - 2;
    var endHour = date.getHours() + 1;
    var day = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    var countPastAjaxCalls = 0;

    initialize();
    $scope.unebaleScroll=function () {
        console.log('working');
        $scope.options.scrollwheel=false;
    }

    function initialize() {
        switchApplicationState(APP_STATE_LOAD_MAP);
    }


    function switchApplicationState(newState) {
        switch (newState) {
            case APP_STATE_LOAD_MAP:

                initializeMap();
                break;
            case APP_STATE_LOAD_CURRENT_HOUR:
                loadCurrentHourData();
                break;
            case APP_STATE_LOAD_DATA:
                currentAppStateFunction = loadData;
                break;
            case APP_STATE_DISPLAY_DATA:
                currentAppStateFunction = displayData;
                break;
            case APP_STATE_LOAD_FUTURE_DATA:
                currentAppStateFunction = loadFutureData;
                break;
        }
    }

    function loadCurrentHourData() {
        //current hour
        var startDate = day + ' ' + calculateHour(endHour - 1);
        //current hour + 1
        var endDate = day + ' ' + calculateHour(endHour);
        getHeatMapData(startDate, endDate, 'current', false)
    }


    function calculateHour(hour) {
        var finalHour;
        if (hour < 10) finalHour = '0' + hour + ':00:00';
        if (hour >= 10) finalHour = hour + ':00:00';
        return finalHour;
    }


    function getHeatMapData(startDate, endDate, timeRange, cache) {
        var method = 'GET';
        console.log(startDate, endDate);
        console.log(startDate, endDate);
        // var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/heatmap/getMetricsByTimeRange/2017-02-01 13:00:00/ 2017-03-13 15:00:00'
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/' +
            'application/service/heatmap/getMetricsByTimeRange/2017-03-01 13:00:00/' + endDate
        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (result) {
            var data = result['data'];
            console.log("marker", data);
            for (var api in data) {


                if (!heatmapData.hasOwnProperty(api)) heatmapData[api] = [];
                if (!markersArray.hasOwnProperty(api)) markersArray[api] = [];

                for (var metric in data[api]) {

                    if (!heatmapData[api].hasOwnProperty(metric)) heatmapData[api][metric] = [];
                    if (!markersArray[api].hasOwnProperty(metric)) markersArray[api][metric] = [];

                    for (var i in data[api][metric]) {

                        if (!heatmapData[api][metric].hasOwnProperty(startDate)) heatmapData[api][metric][startDate] = [];
                        if (!markersArray[api][metric].hasOwnProperty(startDate)) markersArray[api][metric][startDate] = [];

                        var weight;
                        if (timeRange == 'current') weight = data[api][metric][i].real_time_weight;
                        if (timeRange == 'past') weight = data[api][metric][i].overall_weight;
                        if (timeRange == 'future') weight = data[api][metric][i].future_weight;

                        heatmap({
                            id: data[api][metric][i].nid,
                            latitude: data[api][metric][i].latitude,
                            longitude: data[api][metric][i].longitude,
                            title: data[api][metric][i].name,
                            icon: data[api][metric][i].marker_type
                        });

                        createMarker({
                                id: data[api][metric][i].nid,
                                latitude: data[api][metric][i].latitude,
                                longitude: data[api][metric][i].longitude,
                                title: data[api][metric][i].name,
                                icon: data[api][metric][i].marker_type
                            },
                            data[api][metric][i].name, data[api][metric][i].name,
                            data[api][metric][i].marker_type, startDate,
                            api,
                            metric,
                            data[api][metric][i].nid);

                    }
                }
            }


            reorder_array_heatmap();

        });
        // console.log(startDate, endDate, timeRange, cache);
    }




    $scope.markers = [];
    // $scope.markers['icons']={url: "images/markers/marker_0.png"};
    function createMarker(point, title, content, marker_type, start_time, api, metric, nid) {
        // console.log(point, title, content, marker_type, start_time, api, metric, nid)
        if (!$scope.markers.hasOwnProperty(marker_type)) $scope.markers[marker_type] = [];
        if (!$scope.markers[marker_type].hasOwnProperty(marker_type)) $scope.markers[marker_type]["icon"] = [marker_type];
        $scope.markers[marker_type].push(point);

    }

    $scope.heatmepData_save = [];
    function heatmap(point) {
        $scope.heatmepData_save.push(point);

    }

    function reorder_array_heatmap() {
        console.log($scope.heatmepData);
        $scope.heatmepData = $scope.heatmepData_save;

    }


    $scope.marker_type_of = function (marker) {
        var object = false;
        if (typeof marker == "object") {
            console.log(marker);
            object = true;
        }
        return object;
    }

    $scope.markerss = [];
    function reorder_array() {
        for (var i in $scope.markers) {
            $scope.markerss.push($scope.markers[i]);
        }

    }







    function MockHeatLayer(heatLayer) {
        // Adding 500 Data Points
        var map, pointarray, heatmap;

        var taxiData = [
            {location: new google.maps.LatLng(51.218826,4.402950), weight: 3},
            {location: new google.maps.LatLng(51.218826,4.402950), weight: 3},

            // new google.maps.LatLng(37.782551, -122.445368),
            // new google.maps.LatLng(37.782745, -122.444586),
            // new google.maps.LatLng(37.782842, -122.443688),
            // new google.maps.visualization.HeatmapLayer(51.218826, 4.402950),
        ];


        var pointArray = new google.maps.MVCArray(taxiData);
        heatLayer.setData(pointArray);
    };


    function initializeMap() {
        var show_heatmap = true;

        $scope.map = {
            center: {
                latitude: 51.218826,
                longitude: 4.402950
            },
            zoom: 14,
            show:true,
            heatLayerCallback: function (layer) {
                //set the heat layers backend data
                var mockHeatLayer = new MockHeatLayer(layer);
            },
            showHeat: true,
            events: {
                zoom_changed: function () {
                    $timeout(function () {
                        if ($scope.map.zoom > 14 && show_heatmap) {
                            $scope.heatmepData = [];
                            $timeout(function () {
                                reorder_array();
                            }, 200);
                            show_heatmap = !show_heatmap;
                        }
                        if ($scope.map.zoom <= 14 && !show_heatmap) {
                            $scope.markerss = [];
                            $timeout(function () {
                                reorder_array_heatmap();
                            }, 200);
                            show_heatmap = !show_heatmap;
                        }
                    }, 500)

                }
            }
        };
        $scope.options = {
            scrollwheel: true
        };
        $scope.showMarkers = false;
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);

        $scope.markersEvents = {
            mouseover: function (marker, eventName, model) {
                model.show = !model.show;
                $scope.title = marker.model.title;
            },
            mouseout: function (marker, eventName, model) {
                model.show = !model.show;
            },
            click: function (marker, eventName, model) {
                var method = 'GET';
                var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002' +
                    '/front/application/service/place/getCategoryByNid/' + marker.model.id
                $http(
                    {
                        method: method,
                        url: url,
                    }
                ).then(function (result) {
                    console.log('clicked', Object.keys(result.data)[0]);
                    console.log(marker.model.id)
                    // horeca/search/nid
// console.log(ROOT_FRONT +Object.keys(result.data)[0]+'/search/'+marker.model.id);
                    location.href = ROOT_FRONT + '#/section1/' + Object.keys(result.data)[0] + '/search/' + marker.model.id;

                });


            },
        };


        // var markers_0 = [{
        //     id:1,
        //     latitude: 51.218820,
        //     longitude: 4.402900
        // },{
        //     id:2,
        //     latitude: 51.218826,
        //     longitude: 4.402950
        // }];
        // var markers_1 = [];
        //
        //
        // $scope.markers = {
        //     randomMarkers_0: {},
        //     randomMarkers_1: {},
        //     icon_0: {url: "images/markers/marker_0.png"},
        //     icon_1: {url: "images/markers/marker_111.png"},
        // }
    }
});