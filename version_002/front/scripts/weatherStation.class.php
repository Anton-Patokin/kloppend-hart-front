<?php

class weatherStation
{

    protected $version = '1.0'; //weatherStation version
    protected $yahooWeatherZipCode = '966591'; //yahoo zip code for Antwerp, default
    protected $yahooWeatherUnits = 'c'; //c for celsius, f for fahrenheit


    public function __construct()
    {
    }


    /**
     * using buienradar.nl API
     * @param float $lat Latitude of the location
     * @param float $lng Longitude of the location
     * @return Array
     */
    public function rainfallForecast($lat, $lng)
    {
        /* 
         * Op basis van lat lon coördinaten kunt u de neerslag twee uur vooruit ophalen in tekst vorm. 0 is droog, 255 is zware regen. 
         * mm/per uur = 10^((waarde -109)/32) 
         * Dus 77 = 0.1 mm/uur
         */
        $cURL = new cURL('http://gps.buienradar.nl/getrr.php');
        $cURL->setParams(array($lat, $lng));
        $results = $cURL->Request();

        //put all measures in an array
        preg_match_all('/(\S{4,})/i', $results, $m);
        $measures = array();
        $i = 0;
        foreach ($m[0] as $rainfall) {
            $rainfall = explode('|', $rainfall);
            $measures[$i]['value'] = $rainfall[0];
            $measures[$i]['time'] = $rainfall[1];
            $i++;
        }
        return $measures;
    }

    /**
     * Using yahoo weather API
     * @return Array [units, wind, atmosphere, astronomy, conditions, forecast]
     */
    public function weatherForecast()
    {
        $BASE_URL = "http://query.yahooapis.com/v1/public/yql";
        $yql_query = "select * from weather.forecast where woeid= ".$this->yahooWeatherZipCode." and u='".$this->yahooWeatherUnits."'";
        $yql_query_url = $BASE_URL . "?q=" . urlencode($yql_query) . "&format=json";
        // Make call with cURL
        $session = curl_init($yql_query_url);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($session);
        // Convert JSON to PHP object
        $phpObj = json_decode($json,true);

//        $url = "http://weather.yahooapis.com/forecastrss?w=" . $this->yahooWeatherZipCode . "&u=" . $this->yahooWeatherUnits . "&language=fr-be";
//        $file = file_get_contents($url);
//        $xml = simplexml_load_string($file);
//        $ns = $xml->getNamespaces(TRUE);
//        $xml->registerXPathNamespace('c', $ns['yweather']);

        if (!isset($phpObj['query']['results']['channel']['link'])) {
            return t('City not found');
        }

        $element_units = $phpObj['query']['results']['channel']['units'];
        $element_wind = $phpObj['query']['results']['channel']['wind'];
        $element_atmosphere = $phpObj['query']['results']['channel']['atmosphere'];
        $element_astronomy =$phpObj['query']['results']['channel']['astronomy'];
        $element_condition =$phpObj['query']['results']['channel']['item']['condition'];
        $element_forecast =$phpObj['query']['results']['channel']['item']['forecast'];

        //units
        $units = array();
        foreach ($element_units as $a => $b) {
            $units[$a] = (string)$b;
        }

        $wind = array();
        foreach ($element_wind as $a => $b) {
            $wind[$a] = (string)$b;
        }

        //atmosphere
        $atmosphere = array();
        foreach ($element_atmosphere as $a => $b) {
            $atmosphere[$a] = (string)$b;
        }

        //astronomy
        $astronomy = array();
        foreach ($element_astronomy as $a => $b) {
            $astronomy[$a] = (string)$b;
        }

        //condition
        $condition = array();
        foreach ($element_condition as $a => $b) {
            $condition[$a] = (string)$b;
        }

        //forecast
        $forecasts = array();
        foreach ($element_forecast as $key => $value) {
            $aux = array();
            foreach ($element_forecast[$key] as $a => $b) {
                $aux[$a] = (string)$b;
            }
            $forecasts[] = $aux;
        }

        $weather_info = array(
            'units' => $units,
            'wind' => $wind,
            'atmosphere' => $atmosphere,
            'astronomy' => $astronomy,
            'condition' => $condition,
            'forecasts' => $forecasts,
        );

        return $weather_info;
    }

    public function setYahooZipCode($zipCode)
    {
        $this->yahooWeatherZipCode = $zipCode;
    }

    public function setYahooUnits($units)
    {
        $this->yahooWeatherUnits = $units;
    }

}

?>
