<?php

namespace twitter\api;

class BaseTwitterApi {
    
    private $baseUrl = 'https://api.twitter.com/1.1/';
    
    private $oauth_access_token = '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs';
    private $oauth_access_token_secret = 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI';
    private $consumer_key = '47MHPAfhtJE8IGMt5QPAA';
    private $consumer_secret = '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8';
    
    public function __construct($accessToken, $accessTokenSecret, $key, $secret){
        $this->oauth_access_token           = $accessToken;
        $this->oauth_access_token_secret    = $accessTokenSecret;
        $this->consumer_key                 = $key;
        $this->consumer_secret              = $secret;
    }
    
    public function call($request, $params){
        
        $url = $this->baseUrl . $request;
        
        $paramPairs = array();
        foreach($params as $param => $value){
            $paramPairs[] = $param .'='. rawurlencode($value);
        }
        $completeUrl = (!empty($params)) ? $url . '?' . implode('&', $paramPairs) : $url;

        $options = array( CURLOPT_HTTPHEADER => $this->buildHeader($url, $params),
                      //CURLOPT_POSTFIELDS => $postfields,
                      CURLOPT_HEADER => false,
                      CURLOPT_URL => $completeUrl,
                      CURLOPT_RETURNTRANSFER => true,
                      CURLOPT_SSL_VERIFYPEER => false);
        
        $feed = curl_init();
        curl_setopt_array($feed, $options);
        $json = curl_exec($feed);
        curl_close($feed);

        return json_decode($json);
    }
    
    private function buildHeader($url, $params){
        $oauth = $this->createOathData($url, $params);
        return array($this->buildAuthorizationHeader($oauth), 'Expect:');
    }
    
    private function createOathData($url, $params){
        $oauth = array('oauth_consumer_key'       => $this->consumer_key,
                       'oauth_nonce'              => time(),
                       'oauth_signature_method'   => 'HMAC-SHA1',
                       'oauth_token'              => $this->oauth_access_token,
                       'oauth_timestamp'          => time(),
                       'oauth_version'            => '1.0');
        
        $oauth['oauth_signature'] = $this->createSignature($oauth, $url, $params);
        return $oauth;
    }
    
    private function createSignature($oauth, $url, $params){
        $base_info      = $this->buildBaseString('GET', $url, array_merge($params, $oauth));
        $composite_key  = rawurlencode($this->consumer_secret) . '&' . rawurlencode($this->oauth_access_token_secret);
        return base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
    }
    
    private function buildAuthorizationHeader($oauth) {
        $r = 'Authorization: OAuth ';
        $values = array();
        foreach($oauth as $key=>$value)
            $values[] = "$key=\"" . rawurlencode($value) . "\"";
        $r .= implode(', ', $values);
        return $r;
    }

    private function buildBaseString($method, $baseURI, $params) {
        $paramsEncoded = array();
        ksort($params);
        foreach($params as $key=>$value){
            $paramsEncoded[] = "$key=" . rawurlencode($value);
        }
        return $method."&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $paramsEncoded));
    }
}

?>
