<?php
require_once ROOT_FRONT . DS .'scripts' . DS .'cURL.class.php';
require_once ROOT_FRONT . DS .'scripts' . DS .'weatherStation.class.php';

class weatherController{
    
    public function rainFallForecast(){
        $this->doNotRenderHeader = 1;
        $weatherStation = new weatherStation();
        $forecast = $weatherStation->rainfallForecast(51.219088, 4.406498); //coordinates are at the center of antwerp
        echo json_encode($forecast);
    }
    
    public function generalWeatherForecast(){
        $this->doNotRenderHeader = 1;
        $weatherStation = new weatherStation();
        $forecast = $weatherStation->weatherForecast();
        echo json_encode($forecast);
    }
}
?>
