app.controller("PrimeController", function ($scope, $http, $interval) {
    var showHeatmapBool = true;
    var showMarkersBool = true;

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

//default date values
    var start_time = 0;
    var end_time = 0;

//heatmap Settings
    var center;
    var markerOffset  = 17;
    var heatMapRadius = 35;

    var markerCluster;
    var loadAjaxConnections = 0;

//default application state
    var currentAppState = 0;
    var currentAppStateFunction = null;

    var date = new Date();
    var startHour = date.getHours() -2;
    var endHour   = date.getHours() + 1;
    var day  = date.getFullYear() + '-'  + ('0' + (date.getMonth()+1)).slice(-2) + '-'+ ('0' +date.getDate()).slice(-2);

    var countPastAjaxCalls = 0;

    initialize();

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
        console.log(startDate,endDate);
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/' +
            'application/service/heatmap/getMetricsByTimeRange/2017-02-01 13:00:00/ 2017-03-13 15:00:00'
        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (result) {
            var data =result['data'];
            console.log("marker",data);
            for(var api in data){


                if(!heatmapData.hasOwnProperty(api)) heatmapData[api] = [];
                if(!markersArray.hasOwnProperty(api)) markersArray[api] = [];

                for(var metric in data[api]){

                    if(!heatmapData[api].hasOwnProperty(metric)) heatmapData[api][metric] = [];
                    if(!markersArray[api].hasOwnProperty(metric)) markersArray[api][metric] = [];

                    for(var i in data[api][metric]){

                        if(!heatmapData[api][metric].hasOwnProperty(startDate)) heatmapData[api][metric][startDate] = [];
                        if(!markersArray[api][metric].hasOwnProperty(startDate)) markersArray[api][metric][startDate] = [];

                        var weight;
                        if(timeRange == 'current') weight = data[api][metric][i].real_time_weight;
                        if(timeRange == 'past') weight = data[api][metric][i].overall_weight;
                        if(timeRange == 'future') weight = data[api][metric][i].future_weight;
                        //weight needs to be an absolute value -> otherwise heatmap will show squares and other polygons
                        createMarker({
                                id:data[api][metric][i].poi_id,
                                latitude: data[api][metric][i].latitude,
                                longitude: data[api][metric][i].longitude
                            },
                            data[api][metric][i].name, data[api][metric][i].name,
                            data[api][metric][i].marker_type, startDate,
                            api,
                            metric,
                            data[api][metric][i].nid);

                    }
                }
            }

//test

            // console.log(data);
        });
        // console.log(startDate, endDate, timeRange, cache);
    }


$scope.marker_0=[];
    function createMarker(point, title, content, marker_type, start_time, api, metric, nid) {
        $scope.marker_0.push(point);
        console.log($scope.marker_0);

    }

    function initializeMap() {

        $scope.map = {
            center: {
                latitude: 51.218826,
                longitude: 4.402950
            },
            zoom: 14
        };
        $scope.options = {
            scrollwheel: true
        };
        $scope.showMarkers = false;
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
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
        $scope.marker = {
            randomMarkers_0: {},
            randomMarkers_1: {},
            icon_0: {url: "images/markers/marker_0.png"},
            icon_1: {url: "images/markers/marker_111.png"},
        }
    }
});