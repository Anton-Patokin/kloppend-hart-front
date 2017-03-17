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
    $scope.unebaleScroll = function () {
        console.log('working');
        $scope.map.options.scrollwheel = false;
    }

    $scope.enableScroll = function () {
        console.log('working');
        $scope.map.options.scrollwheel = true;
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

        console.log('siqplayDate function date stard an end time', start_time, end_time);
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
        var totalHeatmapData = [];

        if ($scope.heatmepData) {
            totalHeatmapData = extractHeatmapDataBySource('facebook', totalHeatmapData);
        }

        if ($scope.show_foursquare_heatmap) {
            totalHeatmapData = extractHeatmapDataBySource('foursquare', totalHeatmapData);
        }

        if ($scope.show_facebook_heatmap) {
            totalHeatmapData = extractHeatmapDataBySource('apen', totalHeatmapData);
        }


        $scope.heatLayerCallback = function (layer) {
            //set the heat layers backend data
            var mockHeatLayer = new MockHeatLayer(layer,totalHeatmapData);
        };
    }


    function extractHeatmapDataBySource(source, totalHeatmapData) {
        //need timestamps of dates for checkin
        var tsStartTime = explodeDateFormat(start_time);
        var tsEndTime = explodeDateFormat(end_time);

        if (heatmapData.hasOwnProperty(source)) {
            //get metric from facebook
            for (var metric in heatmapData[source]) {
                //get timeZones in Metric
                for (var time in heatmapData[source][metric]) {
                    //check if timeZone is active
                    var ts = explodeDateFormat(time);
                    if (ts >= tsStartTime && ts <= tsEndTime) {
                        //only run this if timeZone meets requirements
                        for (var i in heatmapData[source][metric][time]) {
                            totalHeatmapData.push(heatmapData[source][metric][time][i]);
                        }
                    }
                }
            }
        }
        return totalHeatmapData;
    }

//convert '2013-01-27 12:12:12' to timestamp
    function explodeDateFormat(dateFormat) {
        var formatArray = [];
        formatArray = dateFormat.split(' ');
        dateFormat = formatArray[0].split('-');
        timeFormat = formatArray[1].split(':');
        return Math.round((new Date(dateFormat[0], dateFormat[1], dateFormat[2], timeFormat[0], timeFormat[1], timeFormat[2])).getTime() / 1000);

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
        // console.log(startDate, endDate);
        // var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/heatmap/getMetricsByTimeRange/2017-02-01 13:00:00/ 2017-03-13 15:00:00'
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/' +
            'application/service/heatmap/getMetricsByTimeRange/2017-03-13 13:00:00/' + endDate
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

                        // heatmapData.push({
                        //     location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                        //     weight: Math.abs(weight)
                        // });
                        heatmapData[api][metric][startDate].push({
                            location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
                            weight: Math.abs(weight)
                        });


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
            console.log(marker);
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


    function MockHeatLayer(heatLayer,totalHeatmapData) {
        // Adding 500 Data Points
        console.log('totle heatmap',totalHeatmapData);
        var map, pointarray, heatmap;

        // var taxiData = [
        //     {location: new google.maps.LatLng(51.218826, 4.402050), weight: 3},
        // ];
        var taxiData = totalHeatmapData;

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
        $scope.showHeat = true;
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
    }
});