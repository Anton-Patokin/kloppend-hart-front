<?php
require_once ROOT_FRONT . DS .'scripts' . DS .'cURL.class.php';
class instagramController extends Controller{
    
    public function getPhotosByTag($tag){
        $this->doNotRenderHeader = 1;
        //get this from the API core, instead of hardcoded url 
        $url = "https://api.instagram.com/v1/tags/".$tag."/media/recent?client_id=9753627ab8c8488d9c76e8b68e0a4d18";
        $cURL = new cURL($url);
        echo $cURL->Request();
    }
    
}
?>
