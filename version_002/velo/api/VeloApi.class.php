<?php


namespace velo\api;

class VeloApi
{
    protected $url = "http://datasets.antwerpen.be/v4/gis/velostation.json";

    public function __construct()
    {
    }

    public function getAllVelo()
    {
        return $this->getAllVeloFromUrl($this->url);
    }

    public function getAllVeloFromUrl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response = json_decode($response);
        return $response;
    }
}

?>