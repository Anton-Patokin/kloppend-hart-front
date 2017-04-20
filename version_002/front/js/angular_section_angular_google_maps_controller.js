app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDJBGY58S0ptq6KlFxYIpNLTIEW8mBKhk4',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'drawing,places,visualization'
    });
})

app.service('nearbyPlaces', function ($http, $q) {
    // I get the list of friends from the remote server.
    function getFriends(nid) {
        // The timeout property of the http request takes a deferred value
        // that will abort the underying AJAX request if / when the deferred
        // value is resolved.
        var deferredAbort = $q.defer();
        // Initiate the AJAX request.
        var request = $http({
            method: 'GET',
            url: 'place/getPlaceNearbyPlacesByNid/' + nid,
            timeout: deferredAbort.promise
        });
        // Rather than returning the http-promise object, we want to pipe it
        // through another promise so that we can "unwrap" the response
        // without letting the http-transport mechansim leak out of the
        // service layer.
        var promise = request.then(
            function (response) {
                return ( response.data );
            },
            function (response) {
                return ( $q.reject("Something went wrong") );
            }
        );
        // Now that we have the promise that we're going to return to the
        // calling context, let's augment it with the abort method. Since
        // the $http service uses a deferred value for the timeout, then
        // all we have to do here is resolve the value and AngularJS will
        // abort the underlying AJAX request.
        promise.abort = function () {
            deferredAbort.resolve();
        };
        // Since we're creating functions and passing them out of scope,
        // we're creating object references that may be hard to garbage
        // collect. As such, we can perform some clean-up once we know
        // that the requests has finished.
        promise.finally(
            function () {
                promise.abort = angular.noop;
                deferredAbort = request = promise = null;
            }
        );
        return ( promise );
    }

    // Return the public API.
    return ({
        getFriends: getFriends
    });

})


app.controller("PrimeController", function ($scope, uiGmapGoogleMapApi, $http, $interval, $timeout, $animate, $mdSidenav, $location, $route, $rootScope, nearbyPlaces) {
    var showHeatmapBool = true;
    var showMarkersBool = true;
    $scope.toggleSlider = false;
    $scope.showHeatmapBool = {visible: true};
    $scope.showMarkerBool = {visible: false};
    $scope.showvelo = {visible: false};

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
    var aplicationReady = false
    $scope.show_bicycling = false;
    $scope.hideFrame = false;
    $scope.show_traffic = false;
    $scope.show_heatmap = true;
    $scope.clusterData = [];
    $scope.velo = [];
    $scope.show_apen_heatmap = true;
    $scope.show_foursquare_heatmap = true;
    $scope.show_facebook_heatmap = true;
    $scope.totalHeatmapData = [];
    $scope.showHeat_foursquare = true;
    $scope.showHeat_facebook = true;
    $scope.showHeat_apen = true;
    $scope.size_map_small = false;
    $scope.size_map = false;
    $scope.showFooter = true;
    $scope.sideNavtest = false;
    $scope.showTrendingDiv = true;
    $scope.layer_facebook = "";
    $scope.layer_foursquare = "";
    $scope.layer_apen = "";
    $scope.showOverflow = true;
    $scope.showGoogleMaps = false;
    $scope.activeClass = "";


    var d = new Date();
    $scope.minDate = d;
    $scope.myDate = $scope.minDate;
    var start_time = 0;
    var end_time = 0;
    var slider_start_time = $scope.minDate.getHours() - 3;
    var slider_end_time = $scope.minDate.getHours() + 1;


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
    var footerMinutes;
    var footerHours;
    if (date.getMinutes() < 10) {
        footerMinutes = "0" + date.getMinutes();
    } else {
        footerMinutes = date.getMinutes();
    }
    if (date.getHours() < 10) {
        footerHours = "0" + date.getHours();
    } else {
        footerHours = date.getHours();
    }
    $scope.showCurrentTime = footerHours + '.' + footerMinutes + 'u';
    var startHour = date.getHours() - 2;
    var endHour = date.getHours() + 1;
    var day = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    var countPastAjaxCalls = 0;
    var SHOW_GOOGLE_MAPS = true;
    var GOOLE_MAPS_SIZE = "full";
    var SCROOL_WHEEL = true;

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };


//start application
    initialize();

    var nearbyplacesProsesing = false;

    function currentPageLoaded(pageUrl, $id) {
        aplicationReady = false;
        $scope.show_traffic = false;
        initialize_bounce_marker();
        resetGoogleMapsMarkers();
        $scope.show_bicycling = false;
        $timeout(function () {
            $scope.showvelo.visible = false;
        }, 200);
        disableFooter();
        var root = pageUrl.split("/");
        var new_root = ''
        var nid = "";
        $scope.activeClass = "";
        if (root.length != 1) {
            if (root.length > 3) {
                nid = root[root.length - 1];
            }
            if ($id) {
                nid = $id;
            }

            new_root = root[0] + "/" + root[1];
            $scope.activeClass = new_root;
            if (root.length > 2) {
                $scope.activeClass = new_root + "/" + root[2] + "/" + root[3];

            }
        }
        switch (new_root) {
            case '/section6':
                $scope.size_map = false;
                $scope.hideFrame = true;
                $scope.showGoogleMaps = false;
                GOOLE_MAPS_SIZE = "small";
                SCROOL_WHEEL = false;
                show_velo();
                enableScroll()
                break;
            case '/section7':
                GOOLE_MAPS_SIZE = "small";
                SCROOL_WHEEL = true;
                $scope.hideFrame = false;
                $scope.show_traffic = true;
                enableScroll();
                break;
            case '/section8':
                frame = true;
                $scope.hideFrame = false;
                SHOW_GOOGLE_MAPS = false;
                break;
            case '/section1':
                nearbyplacesProsesing = true;
                $scope.hideFrame = false;
                $scope.map.options.scrollwheel = false;
                $scope.size_map = true;
                load_nearby_places(nid);
                // loadData();
                break;
            default:
                var timeout = 0;
                if (nearbyplacesProsesing) {
                    abortRequestNearbyPlaces();
                    timeout = 1000;
                }
                $timeout(function () {
                    $scope.showGoogleMaps = false;
                    SHOW_GOOGLE_MAPS = true;
                    GOOLE_MAPS_SIZE = "full";
                    //on click brand or on return to home page
                    enableScroll();
                    enableFooter();
                    $scope.hideFrame = true;
                    $scope.size_map = false;
                    switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
                    nearbyplacesProsesing = false;
                    $scope.showGoogleMaps = true;
                    center_google_maps(save_position_lat_client, save_position_long_client, false)

                }, timeout)
                break;
        }
        $timeout(function () {
            $scope.showGoogleMaps = true;
        }, 100)

        $id = "";
    }


    //test prommisses ---------------------------------------------------------------------
    $scope.isLoading = false;
    $scope.friends = [];
    var requestFornearByPlaces = null;

    function abortRequestNearbyPlaces() {
        return ( requestFornearByPlaces && requestFornearByPlaces.abort() );
    };


    function load_nearby_places(nid) {
        // Flag the data is currently being loaded.
        $scope.isLoading = true;
        $scope.friends = [];
        // Make a request for data. Note that we are saving a reference to
        // this response rather than just piping it directly into a .then()
        // call. This is because we need to be able to access the .abort()
        // method on the request and we'll lose that original reference after
        // we call the .then() method.
        ( requestFornearByPlaces = nearbyPlaces.getFriends(nid) ).then(
            function (result) {
                var lat = result.center.latitude;
                var long = result.center.longitude;
                var marker_type = result.center.marker_type;
                var title = result.center.name;

                if (result.near) {
                    result.near.forEach(function (element) {
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
                    id: result.center.nid,
                    coords: {
                        latitude: lat,
                        longitude: long
                    },
                    icon: marker_type,
                    title: title,
                };
                center_google_maps(lat, long, true);
                $timeout(function () {
                    $scope.bounce_marker_options = {animation: google.maps.Animation.BOUNCE};
                }, 100)
                nearbyplacesProsesing = false;
            },
            function (errorMessage) {
                nearbyplacesProsesing = false
                // Flag the data as loaded (or rather, done trying to load). loading).
                $scope.isLoading = false;

            }
        );
    };


    //end test prommisses ---------------------------------------------------------------------


    function resetGoogleMapsMarkers() {
        $scope.markerss = [];
        $scope.markers = [];
        $scope.cluster_save = [];
        $scope.clusterData = [];
        $scope.totalHeatmapData['facebook'] = [];
        $scope.totalHeatmapData['foursquare'] = [];
        $scope.totalHeatmapData['apen'] = [];
        $scope.velo = [];
        $scope.showHeat_facebook = false;
        $scope.showHeat_foursquare = false;
        $scope.showHeat_apen = false;
    }

    $scope.redraw_view = function () {
        currentPageLoaded($location.path())
    }
    $scope.redraw_view_weather = function () {
        $timeout(function () {
            currentPageLoaded($location.path())

        }, 300);
    }

    function initializeMap() {
        initialize_bounce_marker();
        initializeGoogleMapsObject();
        initializeGoogleLayers();
        currentPageLoaded($location.path());
    }

    $scope.loadFirstPoiInSubMenu = function ($id) {
        currentPageLoaded($location.path(), $id)
    }
    function enableScroll() {
        $scope.map.zoom = 10;
        $scope.map.options.scrollwheel = true;
    }


    function disableFooter() {
        $scope.showFooter = false;
        $scope.showOverflow = false;
    }

    function enableFooter() {
        $scope.showFooter = true;
        $scope.showOverflow = true;
    }

    $scope.toggleTrending = function (place) {
        if (place == 'topNav') {
            $scope.dropdownToggle = !$scope.dropdownToggle;
        }
        else {
            if ($scope.dropdownToggle == true) {
                $scope.dropdownToggle = false
            }
        }
    }

    $scope.closeSideNav = buildToggler2();
    function buildToggler2() {
        return function () {
            if ($scope.sideNavtest == false) {
                $scope.sideNavtest = true;
            }
        }
    }

    $scope.lockLeft = true;

    $scope.toggleLeft = buildToggler();

    function buildToggler() {
        return function () {
            $scope.sideNavtest = !$scope.sideNavtest;
        };

    }

    $scope.$watch('myDate', function () {
        var date_picker = new Date($scope.myDate.toISOString());
        day = date_picker.getFullYear() + '-' + ('0' + (date_picker.getMonth() + 1)).slice(-2) + '-' + ('0' + date_picker.getDate()).slice(-2);

        if (aplicationReady) {
            resetGoogleMapsMarkers();
            switchApplicationState(APP_STATE_LOAD_CURRENT_HOUR);
        }
        aplicationReady = true;
    });

    $scope.myChangeListener = function (sliderId) {
        slider_start_time = $scope.slider.minValue;
        slider_end_time = $scope.slider.maxValue;
        if ($scope.slider.maxValue == "24") {
            slider_end_time = "23.59";
        }
        resetGoogleMapsMarkers();
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
            onEnd: $scope.myChangeListener,
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

        $scope.showHeat_facebook = true;
        $scope.showHeat_foursquare = true;
        $scope.showHeat_apen = true;
        //check if option for heatmap is checked
        switch_between_marker_and_cluster('cluster');
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
        var timeout = 0;
        getHeatMapData(startDate, endDate, 'current')

    }


    function calculateHour(hour) {
        var finalHour;
        if (hour < 10) finalHour = '0' + hour + ':00:00';
        if (hour >= 10) finalHour = hour + ':00:00';
        return finalHour;
    }


    function getHeatMapData(startDate, endDate, timeRange) {
        var method = 'GET';
        var url = 'heatmap/getMetricsByTimeRange/' + startDate + '/' + endDate
        $http(
            {
                method: method,
                url: url,
            }
        ).then(function (result) {
            var data = result['data'];

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
        $scope.markerss = [];
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
        // location.href = '';
        $location.path('/', false);
        currentPageLoaded($location.path())
    }


    function initialize_bounce_marker() {
        $scope.bounce_marker_options = {};
        $scope.marker_center = {
            id: 1,
            coords: {
                latitude: {},
                longitude: {}
            },
            icon: '0',
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

    function initializeGoogleMapsObject() {
        $scope.map = {
            center: {
                latitude: center_antwerpen_lat,
                longitude: center_antwerpen_long
            },
            zoom: zoom,
            show: SHOW_GOOGLE_MAPS,
            options: {
                minZoom: 13,
                scrollwheel: SCROOL_WHEEL,
            },
            draggable: false,
            control: {
                refresh: function ($object) {
                    return {
                        latitude: center_antwerpen_lat,
                        longitude: center_antwerpen_long,
                    }
                },
            },
            events: {
                zoom_changed: function () {
                    if ($scope.map.zoom >= 15 && $scope.show_heatmap) {
                        $scope.clusterData = [];
                    }
                    $timeout(function () {
                        if ($scope.map.zoom > 13 && $scope.show_heatmap) {
                            switch_between_marker_and_cluster("marker");
                            $scope.show_heatmap = !$scope.show_heatmap;
                        }
                        if ($scope.map.zoom <= 13 && !$scope.show_heatmap) {
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
                    var url = ROOT_FRONT + 'place/getCategoryByNid/' + marker.model.id
                    $http(
                        {
                            method: method,
                            url: url,
                        }
                    ).then(function (result) {
                        //redirect to page witch clicket marker

                        $location.path('/section1/show/search/' + marker.model.id, true);
                        // currentPageLoaded($location.path())
                        // location.href = '#/section1/' + Object.keys(result.data)[0] + '/search/' + marker.model.id;

                    });
                    // load_nearby_places(marker.model.id);
                },
            }, velo: {
                event: {
                    click: function (marker, eventName, model) {
                    },
                },
                show: {
                    visible: false,
                },
            }

        };
    }

    function initializeGoogleLayers() {
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
    }


    function show_velo() {
        $scope.show_bicycling = true;
        $timeout(function () {
            $http(
                {
                    method: 'GET',
                    url: 'velo/getAll',
                }
            ).then(function (result) {
                $scope.showvelo.visible = true;
                angular.forEach(result.data, function (value, key) {
                    var velo = {
                        id: value.velo_id,
                        latitude: value.point_lat,
                        longitude: value.point_lng,
                        title: value.name
                    }
                    $scope.velo.push(velo);
                });
            });
        }, 500)

    }


    uiGmapGoogleMapApi.then(function (maps) {

    });
});