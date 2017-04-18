<?php
    namespace yelp\api;
    require_once ('OAuth.php');
    class YelpApi {
        private $api_root = "http://api.yelp.com/v2/";
        private $consumer_key = "A8iy45Heuns2-l9Cqidbog";
        private $consumer_secret = "8R1VWyrdSwLgz3doQ8x8YA0QYw8";
        private $token = "41GsgV-wZDlsakBvG62KpWHO5-aY3wfD";
        private $token_secret = "jzl6RoAxxRomuz_E7gIL3ApuZjo";

        private $oauth_token;
        private $oauth_consumer;
        private $signature_method;

        public function __construct(){        
            $this->oauth_token = new \OAuthToken($this->token, $this->token_secret);
            $this->oauth_consumer = new \OAuthConsumer($this->consumer_key, $this->consumer_secret);
            $this->signature_method = new \OAuthSignatureMethod_HMAC_SHA1();
        }

        public function searchCoordinate($latitude, $longitude, $radius_filter, $limit){
            $unsigned_url = $this->api_root . "search?ll=" . $latitude . "," . $longitude . "&radius_filter=" . $radius_filter . "&limit=" . $limit;
            $signed_url = $this->signUrl($unsigned_url);
            return $this->sendRequest($signed_url);
        }

        public function getBusiness($business_id){
            $unsigned_url = $this->api_root . "business/" . $business_id;
            $signed_url = $this->signUrl($unsigned_url);
            return $this->sendRequest($signed_url);
        }

        private function signUrl($unsigned_url){        
            $oauthrequest = \OAuthRequest::from_consumer_and_token($this->oauth_consumer, $this->oauth_token, 'GET', $unsigned_url);
            $oauthrequest->sign_request($this->signature_method, $this->oauth_consumer, $this->oauth_token);
            return $oauthrequest->to_url();
        }

        private function sendRequest($signed_url){
            $ch = curl_init($signed_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            $data = curl_exec($ch); // Yelp response
            curl_close($ch);
            return json_decode($data);
        }
    }
?>
