app.controller("section8", function ($scope, $interval) {
    $interval(Start, 1000);
    function Start() {
        var tmp = new Date();
        $scope.webcam = tmp.getTime();
    }
});