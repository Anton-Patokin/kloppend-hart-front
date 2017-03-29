app.controller("SideBarController", function ($scope, $timeout, $mdSidenav) {

	$scope.toggleLeft = buildToggler('left1');

	$scope.closeSideNav = buildToggler2('left1');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

    function buildToggler2(componentId){
    	return function() {
    		if ($mdSidenav(componentId).isOpen()) {
    			$mdSidenav(componentId).toggle();
    		}
    	}
    }
});