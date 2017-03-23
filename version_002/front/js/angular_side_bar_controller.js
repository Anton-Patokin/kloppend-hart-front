app.controller("SideBarController", function ($scope, $timeout, $mdSidenav) {

	$scope.toggleLeft = buildToggler('left1');
 

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
});