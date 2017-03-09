<?php

class foursquareController extends Controller{
    
    public function getFoursquareCheckins(){
        $this->doNotRenderHeader = 1;
        $metrics = $this->foursquareModel->getFoursquareMetricByName('checkin');
        var_dump($metrics);
    }
    
    public function getFoursquareUsers(){
        $this->doNotRenderHeader = 1;
        $metrics = $this->foursquareModel->getFoursquareMetricByName('user');
        var_dump($metrics);
    }
}
?>
