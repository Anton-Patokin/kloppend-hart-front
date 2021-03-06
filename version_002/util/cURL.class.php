<?php
namespace util;
class cURL{
    
    protected $url;
    protected $params = false;
    protected $type = 'GET';
    
    
    public function __construct($url){$this->url = $url;}
    
    
    /**
     * @param Array $params The paramters for the request(POST | GET)
     */
    public function setParams($params){$this->params = $params;}
    
    /**
     * @param string $type 'GET' or 'POST'
     */
    public function setType($type){$this->type = $type;}
    
    /**
     * Request
     * Performs a cUrl request with a url generated by MakeUrl. The useragent of the request is hardcoded
     * as the Google Chrome Browser agent
     * @param String $url The base url to query
     * @param Array $params The parameters to pass to the request
     */
    public function Request(){
            // Populate data for the GET request
            if($this->type == 'GET') $this->MakeUrl();

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL,$this->url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
            if ( isset($_SERVER['HTTP_USER_AGENT']) ) {
                    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] );
            }else {
                    // Handle the useragent like we are Google Chrome, if no user-agent was found
                    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.X.Y.Z Safari/525.13.');
            }
            curl_setopt($ch , CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            // Populate the data for POST
            if($this->type == 'POST'){
                    curl_setopt($ch, CURLOPT_POST, 1); 
                    if($this->params) curl_setopt($ch, CURLOPT_POSTFIELDS, $this->params);
            }

            $result=curl_exec($ch);
            $info=curl_getinfo($ch);
            curl_close($ch);
            return $result;
    }

    /**
     * MakeUrl
     * Takes a base url and an array of parameters and sanitizes the data, then creates a complete
     * url with each parameter as a GET parameter in the URL
     * @param String $url The base URL to append the query string to (without any query data)
     * @param Array $params The parameters to pass to the URL
     */	
    private function MakeUrl(){
            if(!empty($this->params) && $this->params){
                    foreach($this->params as $k=>$v) $kv[] = "$k=$v";
                    $url_params = str_replace(" ","+",implode('&',$kv));
                    $this->url = trim($this->url) . '?' . $url_params;
            }
            return $this->url;
    }
    
    
    
}
?>
