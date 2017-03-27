app.controller("PrimeController", function ($scope, $http, $interval, $timeout) {
    var showHeatmapBool = true;
    var showMarkersBool = true;
    $scope.showHeatmapBool = {visible: true};
    $scope.showMarkerBool = {visible: false};
    var $slide;
    var zoom = 14;
    var save_position_lat_client = 51.218826;
    var save_position_long_client = 4.402950
//application states
    var APP_STATE_LOAD_MAP = 0;
    var APP_STATE_LOAD_CURRENT_HOUR = 1;
    var APP_STATE_LOAD_DATA = 2;
    var APP_STATE_DISPLAY_DATA = 3;
    var APP_STATE_LOAD_FUTURE_DATA = 4;
    var loaded;
    var center_antwerpen_lat = 51.218826;
    var center_antwerpen_long = 4.402950;
//general variables
    var map;
    var heatmap;
    var heatmapData = [];
    var markersArray = [];
    $scope.show_heatmap = true;
    $scope.clusterData = [];
    $scope.show_apen_heatmap = true;
    $scope.show_foursquare_heatmap = true;
    $scope.show_facebook_heatmap = true;
    $scope.totalHeatmapData = [];
    $scope.showHeat_foursquare = true;
    $scope.showHeat_facebook = true;
    $scope.showHeat_apen = true;
    $scope.size_map_small = false;
    $scope.size_map = false;


//default date values
    $scope.myDate = new Date();
    var start_time = 0;
    var end_time = 0;
    var slider_start_time = $scope.myDate.getHours() - 3;
    var slider_end_time = $scope.myDate.getHours() + 1;


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
    $scope.disableSroll = function (nid) {
        load_nearby_places(nid);
        $scope.map.options.scrollwheel = false;
        $scope.showTrendingDiv = false;
    }

    $scope.enableScroll = function () {
        $scope.map.options.scrollwheel = true;
        $scope.showTrendingDiv = true;
    }

    $scope.toggleTrending = function(place){
        if (place == 'topNav') {
            $scope.dropdownToggle = !$scope.dropdownToggle;
        }
        else {
            if ($scope.dropdownToggle == true) {
                $scope.dropdownToggle = false
            }
        }        
    }


    $scope.$watch('myDate', function () {
        var date_picker = new Date($scope.myDate.toISOString());
        day = date_picker.getFullYear() + '-' + ('0' + (date_picker.getMonth() + 1)).slice(-2) + '-' + ('0' + date_picker.getDate()).slice(-2);
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
    });

    $scope.myChangeListener = function (sliderId) {
        slider_start_time = $scope.slider.minValue;
        slider_end_time = $scope.slider.maxValue;
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
    };
    $scope.layer = "";
    $scope.slider = {
        minValue: slider_start_time,
        maxValue: slider_end_time,
        options: {
            floor: 0,
            ceil: 24,
            showTicksValues: 1.00,
            id: 'sliderA',
            onChange: $scope.myChangeListener,
            precision: 2,
            translate: function (value) {
                return value + '.00';
            }
        }
    };

    $scope.show_facebook_marker = true;
    $scope.show_foursquare_marker = true;
    $scope.show_apen_marker = true;

    $scope.checkbox_social_media = function (event) {
        switch (event.currentTarget.name) {
            case 'facebookCheck':
                $scope.show_facebook_marker = !$scope.show_facebook_marker;
                break;
            case 'foursquareCheck':
                $scope.show_foursquare_marker = !$scope.show_foursquare_marker
                break;
            case 'apenCheck':
                $scope.show_apen_marker = !$scope.show_apen_marker;
                break;
            default:
                $scope.showHeat_foursquare = true;
                $scope.showHeat_facebook = true;
                $scope.showHeat_apen = true;
                $scope.show_facebook_marker = true;
                $scope.show_foursquare_marker = true;
                $scope.show_apen_marker = true;
        }
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);

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
        if ($scope.show_heatmap == true)switch_between_marker_and_cluster('cluster');
        if ($scope.show_heatmap != true) switch_between_marker_and_cluster("marker");

        if ($scope.layer_foursquare && $scope.layer_facebook && $scope.layer_apen) {
            $scope.heatLayerCallback_foursquare($scope.layer_foursquare, $scope.totalHeatmapData['foursquare']);
            $scope.heatLayerCallback_facebook($scope.layer_facebook, $scope.totalHeatmapData['facebook']);
            $scope.heatLayerCallback_apen($scope.layer_apen, $scope.totalHeatmapData['apen']);
        }
    }


    function loadCurrentHourData() {
        //current hour
        var startDate = day + ' ' + calculateHour(slider_start_time);
        //current hour + 1
        var endDate = day + ' ' + calculateHour(slider_end_time);
        getHeatMapData(startDate, endDate, 'current')
    }


    function calculateHour(hour) {
        var finalHour;
        if (hour < 10) finalHour = '0' + hour + ':00:00';
        if (hour >= 10) finalHour = hour + ':00:00';
        return finalHour;
    }


    function clean_map() {
        $scope.markers = [];
        $scope.markerss = [];
        $scope.cluster_save = [];
        $scope.totalHeatmapData['facebook'] = [];
        $scope.totalHeatmapData['foursquare'] = [];
        $scope.totalHeatmapData['apen'] = [];
    }

    function getHeatMapData(startDate, endDate, timeRange) {
        var method = 'GET';
        var url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/' +
            'application/service/heatmap/getMetricsByTimeRange/' + startDate + '/' + endDate
        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (result) {
            var data = result['data'];
            clean_map();
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


                        //sort google marker to categories sort function
                        if (api == 'facebook' && $scope.show_facebook_marker == true) {
                            $scope.totalHeatmapData['facebook'].push(create_google_maps_latlang(data, api, metric, i, weight, startDate));
                        }

                        if (api == 'foursquare' && $scope.show_foursquare_marker == true) {
                            $scope.totalHeatmapData['foursquare'].push(create_google_maps_latlang(data, api, metric, i, weight, startDate));

                        }

                        if (api == 'apen' && $scope.show_apen_marker == true) {
                            $scope.totalHeatmapData['apen'].push(create_google_maps_latlang(data, api, metric, i, weight, startDate));
                        }

                    }
                }
            }
            if (timeRange == 'current') {
                loaded = 'current';
                switchApplicationState(APP_STATE_DISPLAY_DATA);
            }
        }, function () {
            clean_map();
        });
    }


    function create_google_maps_latlang(data, api, metric, i, weight, startDate) {

        heatmapData[api][metric][startDate].push({
            // weight must by absolut for making heat map round other way you can get diferent chaps
            location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
            weight: Math.abs(weight)
        });


        //this needed for clustering the markers.
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
                icon: data[api][metric][i].marker_type,
                options: {}
            },
            data[api][metric][i].marker_type);

        return {
            location: new google.maps.LatLng(data[api][metric][i].latitude, data[api][metric][i].longitude),
            weight: Math.abs(weight)
        }
    }

    $scope.markers = [];
    function createMarker(point, marker_type) {
        //sort to diferent marker categories, for loping in html page with ng-repeat=> make markers by marker type
        if (!$scope.markers.hasOwnProperty(marker_type)) $scope.markers[marker_type] = [];
        if (!$scope.markers[marker_type].hasOwnProperty(marker_type)) $scope.markers[marker_type]["icon"] = [marker_type];
        $scope.markers[marker_type].push(point);

    }

    $scope.cluster_save = [];
    function heatmap(point) {
        $scope.cluster_save.push(point);

    }

    function show_marker_cluster() {
        $scope.clusterData = $scope.cluster_save;
    }

    function clean_map_from_markers_and_clusters() {
        $scope.clusterData = [];
        $scope.markerss = [];
        $scope.markers = [];
        $scope.showHeat_facebook = false;
        $scope.showHeat_foursquare = false;
        $scope.showHeat_apen = false;
    }

    function switch_between_marker_and_cluster(show_element) {
        //on zoom in change view of markers
        if (show_element == "marker") {
            $scope.clusterData = [];
            show_markers();
        }
        if (show_element == "cluster") {
            $scope.markerss = [];
            show_marker_cluster();
        }
    }

    $scope.markerss = [];
    function show_markers() {
        for (var i in $scope.markers) {
            $scope.markerss.push($scope.markers[i]);
        }

    }


    function MockHeatLayer(heatLayer, data) {
        //use google callback information of google maps to fill heatmap data to the map by categorie => facebook, apen...
        var taxiData = data;
        var pointArray = new google.maps.MVCArray(taxiData);
        heatLayer.set('radius', heatMapRadius);
        heatLayer.setData(pointArray);
    }

    $scope.home = function () {
        //on click brand or on return to home page
        $scope.enableScroll();
        initialize_bounce_marker();
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
        $scope.showHeat_facebook = true;
        $scope.showHeat_foursquare = true;
        $scope.showHeat_apen = true;
        $scope.size_map = false;
        $timeout(function () {
            center_google_maps(save_position_lat_client, save_position_long_client, false)

        }, 50)
        location.href = '#';
    }
    function initialize_bounce_marker() {
        $scope.marker_center = {
            id: 1,
            coords: {
                latitude: {},
                longitude: {}
            },
            icon: '',
            title: "",
        };
    }


    function center_google_maps(lat, long, zoom_bool) {
        $scope.map.control.refresh(
            {
                latitude: lat,
                longitude: long,
            }
        );
        if (zoom_bool) {
            $scope.map.zoom = 17;
        } else {
            $scope.map.zoom = $scope.map.zoom;

        }

    }


    function load_nearby_places(nid) {
        $scope.bounce_marker_options = {animation: false};
        $scope.size_map = true;
        // save_position_lat_client = marker.model.latitude;
        // save_position_long_client = marker.model.longitude;
        clean_map_from_markers_and_clusters();


        //set nearby markers and bounce to active marker center
        $http(
            {
                method: 'GET',
                url: 'application/service/place/getPlaceNearbyPlacesByNid/' + nid,
            }
        ).then(function (result) {

            var lat = result.data.center.latitude;
            var long = result.data.center.longitude;
            var marker_type = result.data.center.marker_type;
            var title = result.data.center.name;

            console.log('foreachresult', result)
            if (result.data.near) {
                result.data.near.forEach(function (element) {
                    createMarker({
                            id: element.nid,
                            latitude: element.latitude,
                            longitude: element.longitude,
                            title: element.name,
                            icon: element.marker_type
                        },
                        element.marker_type);
                });
            }
            switch_between_marker_and_cluster("marker");
            $scope.marker_center = {
                id: result.data.center.nid,
                coords: {
                    latitude: lat,
                    longitude: long
                },
                icon: marker_type,
                title: title,
            };
            center_google_maps(Number(lat), long, true);
            $timeout(function () {
                $scope.bounce_marker_options = {animation: google.maps.Animation.BOUNCE};
            }, 100)

        });


    }

    $scope.getNearbyPlaceses = function (nid) {
        load_nearby_places(nid);
    }
    function initializeMap() {
        initialize_bounce_marker()
        $scope.bounce_marker_options = {};

        $scope.map = {
            center: {
                latitude: center_antwerpen_lat,
                longitude: center_antwerpen_long
            },
            zoom: zoom,
            show: true,
            options: {
                minZoom: 13,
                scrollwheel: true
            },
            draggable: false,
            control: {},
            events: {
                zoom_changed: function () {
                    if ($scope.map.zoom >= 15 && $scope.show_heatmap) {
                        $scope.clusterData = [];
                    }
                    $timeout(function () {
                        if ($scope.map.zoom > 14 && $scope.show_heatmap) {
                            switch_between_marker_and_cluster("marker");
                            $scope.show_heatmap = !$scope.show_heatmap;
                        }
                        if ($scope.map.zoom <= 14 && !$scope.show_heatmap) {
                            switch_between_marker_and_cluster('cluster');
                            $scope.show_heatmap = !$scope.show_heatmap;
                        }
                    }, 300)
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
                        //redirect to page witch clicket marker
                        location.href = '#/section1/' + Object.keys(result.data)[0] + '/search/' + marker.model.id;

                    });
                    load_nearby_places(marker.model.id);
                },
            },
        };
        $scope.layer_facebook = "";
        $scope.layer_foursquare = "";
        $scope.layer_apen = "";


        //this function run only after google maps is total loaded/ html=> googleMaps=>onCreated=> function below.
        $scope.heatLayerCallback_foursquare = function (layer) {
            //set the heat layers backend data
            $scope.layer_foursquare = layer;
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['foursquare']);
        };
        $scope.heatLayerCallback_facebook = function (layer) {
            //set the heat layers backend data
            $scope.layer_facebook = layer;
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['facebook']);
        };
        $scope.heatLayerCallback_apen = function (layer) {
            //set the heat layers backend data
            $scope.layer_apen = layer;
            var mockHeatLayer = new MockHeatLayer(layer, $scope.totalHeatmapData['apen']);
        };
        switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR)

    }

});