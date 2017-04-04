 <div ng-show="showFooter" class="div">
    <div class="overlay_1_1-able" ng-class="{'overlay_1_1-disabled':toggleSlider, 'overlay_1_1-able':!toggleSlider}">
        <button ng-click="toggleSlider = !toggleSlider" class="custom-slider-button-toggle">tijdlijn — {{showCurrentTime}}</button>
        <div class="col-md-10">
            <rzslider class="custom-slider"
                      rz-slider-model="slider.minValue"
                      rz-slider-high="slider.maxValue"
                      rz-slider-options="slider.options">
            </rzslider>
        </div>
        <div class="col-md-2 datepicker_1">
            <md-content>
                <md-datepicker ng-model="myDate" ></md-datepicker>
            </md-content>
        </div>
    </div>
</div>
</body>
</html>
