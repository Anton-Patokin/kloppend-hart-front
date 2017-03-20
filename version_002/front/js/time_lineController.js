app.controller("timeLineController", function ($scope, $timeout) {


    var vm = this;
    vm.lastSliderUpdated = '';

    vm.myChangeListener = function(sliderId) {
        console.log(sliderId, 'has changed with ', $scope.slider.minValue);
        console.log(sliderId, 'has changed with ', $scope.slider.maxValue);
    };
    $scope.slider = {
        minValue: 0.00,
        maxValue: 24.00,
        options: {
            floor: 0.00,
            ceil: 24.00,
            showTicksValues: 1.00,
            id: 'sliderA',
            onChange: vm.myChangeListener,
            precision:2,
            translate: function(value) {
                return value + '.00';
            }
        }
    };
});