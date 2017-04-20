app.controller("section8", function ($scope, $interval,$location) {
    var tmp = new Date();
    $scope.webcam = tmp.getTime();
    $interval(Start, 1000);
    function Start() {
        var tmp = new Date();
        $scope.webcam = tmp.getTime();
    }
});