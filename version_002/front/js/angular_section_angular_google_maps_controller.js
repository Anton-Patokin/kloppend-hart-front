app.controller("PrimeController", function ($scope, $http, $interval, $timeout) {
    var showHeatmapBool = true;
    var showMarkersBool = true;
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
    $scope.show_apen_heatmap = true;
    $scope.show_foursquare_heatmap = true;
    $scope.show_facebook_heatmap = true;
    $scope.totalHeatmapData = [];
    $scope.totalHeatmapData['facebook'] = [];
    $scope.totalHeatmapData['foursquare'] = [];
    $scope.totalHeatmapData['apen'] = [];
    $scope.showHeat_foursquare = true;
    $scope.showHeat_facebook = true;
    $scope.showHeat_apen = true;


//default date values
    var start_time = 0;
    var end_time = 0;
    $scope.myDate = new Date();


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
    $scope.showTrendingDiv = true;
    $scope.disableSroll = function () {
        $scope.map.options.scrollwheel = false;
        $scope.showTrendingDiv = false;
    }

    $scope.enableScroll = function () {
        $scope.map.options.scrollwheel = true;
        $scope.showTrendingDiv = true;
    }


    $scope.$watch('myDate', function () {
        console.log('datum change', $scope.myDate);
    });


    $scope.myChangeListener = function (sliderId) {
        console.log(sliderId, 'has changed with ', $scope.slider.minValue);
        console.log(sliderId, 'has changed with ', $scope.slider.maxValue);
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);

    };
    $scope.slider = {
        minValue: 0.00,
        maxValue: 24.00,
        options: {
            floor: 0.00,
            ceil: 24.00,
            showTicksValues: 1.00,
            id: 'sliderA',
            onChange: $scope.myChangeListener,
            precision: 2,
            translate: function (value) {
                return value + '.00';
            }
        }
    };


    $scope.checkbox_social_media = function (event) {
        switch (event.currentTarget.name) {
            case 'facebookCheck':
                $scope.showHeat_facebook = !$scope.showHeat_facebook;
                break;
            case 'foursquareCheck':
                $scope.showHeat_foursquare = !$scope.showHeat_foursquare;
                break;
            case 'apenCheck':
                $scope.showHeat_apen = !$scope.showHeat_apen;
                break;
            default:
                $scope.showHeat_foursquare = true;
                $scope.showHeat_facebook = true;
                $scope.showHeat_apen = true;
        }
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
                displayData();
                break;
            case APP_STATE_LOAD_FUTURE_DATA:
                currentAppStateFunction = loadFutureData;
                break;
        }
    }


    function displayData() {

        start_time = day + ' ' + calculateHour(startHour);
        end_time = day + ' ' + calculateHour(endHour);

        //check if option for heatmap is checked
        if (showHeatmapBool === true) showHeatmap(start_time, end_time);
        // if(showMarkersBool === true) showMarkers(start_time, end_time);

        // if(loaded == 'current' ){
        //     switchApplicationState(APP_STATE_LOAD_DATA);
        //     runApp();
        // }
        //
        // if(loaded == 'past' ){
        //     switchApplicationState(APP_STATE_LOAD_FUTURE_DATA);
        //     //runApp();
        // }
    }

    function showHeatmap(start_time, end_time) {

        console.log('show heatmap');


    }

    function loadCurrentHourData() {
        //current hour
        var startDate = day + ' ' + calculateHour(startHour - 1);
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
        // console.log(startDate, endDate);
        // var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/heatmap/getMetricsByTimeRange/2017-02-01 13:00:00/ 2017-03-13 15:00:00'
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/' +
            'application/service/heatmap/getMetricsByTimeRange/' + startDate + '/' + endDate
        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (result) {
            var data = result['data'];
            console.log('data result', result);

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

                        // heatmapData.push({
                        //     location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                        //     weight: Math.abs(weight)
                        // });
                        heatmapData[api][metric][startDate].push({
                            location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                            weight: Math.abs(weight)
                        });


                        if (api == 'facebook') {
                            $scope.totalHeatmapData['facebook'].push({
                                location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                                weight: Math.abs(weight)
                            });
                        }

                        if (api == 'foursquare') {
                            $scope.totalHeatmapData['foursquare'].push({
                                location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                                weight: Math.abs(weight)
                            });

                        }

                        if (api == 'apen') {
                            $scope.totalHeatmapData['apen'].push({
                                location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                                weight: Math.abs(weight)
                            });
                        }


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


            if (timeRange == 'current') {
                loaded = 'current';
                switchApplicationState(APP_STATE_DISPLAY_DATA);
                show_marker_cluster();
            }


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

    function show_marker_cluster() {
        $scope.heatmepData = $scope.heatmepData_save;
    }

    function switch_between_marker_and_cluster(show_element) {
        if (show_element == "marker") {
            $scope.heatmepData = [];
            show_markers();
        }
        if (show_element == "cluster") {
            $scope.markerss = [];
            show_marker_cluster();
        }
    }

    $scope.marker_type_of = function (marker) {
        var object = false;
        if (typeof marker == "object") {
            object = true;
        }
        return object;
    }

    $scope.markerss = [];
    function show_markers() {
        for (var i in $scope.markers) {
            $scope.markerss.push($scope.markers[i]);
        }

    }


    function MockHeatLayer(heatLayer, data) {
        // Adding 500 Data Points
        var map, pointarray, heatmap;

        var taxiData = data;

        var pointArray = new google.maps.MVCArray(taxiData);
        heatLayer.set('radius', heatMapRadius);
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
            show: true,
            options: {
                scrollwheel: true
            },
            draggable: false,
            events: {
                zoom_changed: function () {
                    $timeout(function () {
                        if ($scope.map.zoom > 14 && show_heatmap) {
                            switch_between_marker_and_cluster("marker");
                            show_heatmap = !show_heatmap;
                        }
                        if ($scope.map.zoom <= 14 && !show_heatmap) {
                            switch_between_marker_and_cluster('cluster');
                            show_heatmap = !show_heatmap;
                        }
                    }, 500)
                }
            },
            markersEvents: {
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
                        location.href = ROOT_FRONT + '#/section1/' + Object.keys(result.data)[0] + '/search/' + marker.model.id;

                    });


                },
            },
        };
        $scope.heatLayerCallback_foursquare = function (layer) {
            //set the heat layers backend data
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['foursquare']);
        };
        $scope.heatLayerCallback_facebook = function (layer) {
            //set the heat layers backend data
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['facebook']);
        };
        $scope.heatLayerCallback_apen = function (layer) {
            //set the heat layers backend data
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['apen']);
        };

        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
    }
});