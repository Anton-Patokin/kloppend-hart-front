var app = angular.module("myApp", ["ngRoute", 'uiGmapgoogle-maps', 'angular.morris','rzModule','ngMaterial','ngMessages','ui.bootstrap', 'ngCookies']);



app.config(function ($routeProvider) {
    $routeProvider
        .when("/section1/:category/:action/:value", {
            templateUrl: function(attrs){ 
                return 'sections/section1.php?category=' + attrs.category + '&action=' + attrs.action + '&value=' + attrs.value; },
            controller  : 'section1'
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

app.run(function run( $rootScope, $cookies ){
    $rootScope.firstTimeVisited = true;
    // if ($cookies.get('firstTimeVisited') == null) {
    //     $rootScope.firstTimeVisited = true;
    //     var now = new Date();
    //     var expirationDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());
    //     $cookies.put('firstTimeVisited', 'true', {'expires': expirationDate});
    // } else {
    //     $rootScope.firstTimeVisited = false;
    // }
    
    // $cookies.put('myFavorite', 'oatmeal');
    $rootScope.toggleMenu = function(event){
        console.log('EVENT: ', event.path[1]['id']);

        $("#"+event.path[1]['id']).next('div').slideToggle();

        $("#"+event.path[1]['id']).parent().siblings().children().next().slideUp();
        // console.log('DIV ID: ', divId);
        // $('#'+divId).slideToggle();
        // $('.instuction').slideUp();
    }
});

angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache']).controller('AppCtrl', function() {
    this.myDate = new Date();
    this.isOpen = false;
});