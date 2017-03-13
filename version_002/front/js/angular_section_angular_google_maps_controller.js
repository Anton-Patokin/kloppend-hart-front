app.controller("PrimeController", function ($scope, $http, $interval) {
    var APP_STATE_LOAD_MAP = 0;
    var APP_STATE_LOAD_CURRENT_HOUR = 1;
    var APP_STATE_LOAD_DATA = 2;
    var APP_STATE_DISPLAY_DATA = 3;
    var APP_STATE_LOAD_FUTURE_DATA = 4;
    var date = new Date();
    var startHour = date.getHours() - 2;
    var endHour = date.getHours() + 1;
    var day = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);


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
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/heatmap/getMetricsByTimeRange/2017-01-25%2000:00:00/2017-02-28%2023:00:00'

        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (response) {
            console.log(response);
        });
        console.log(startDate, endDate, timeRange, cache);
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
        // $scope.marker = {
        //     randomMarkers_0: markers_0,
        //     randomMarkers_1: markers_1,
        //     icon_0: {url: "images/markers/marker_0.png"},
        //     icon_1: {url: "images/markers/marker_111.png"},
        // }
    }
});