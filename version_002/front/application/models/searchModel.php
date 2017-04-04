<?php
require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once ROOT . 'poi/service/PoiService.class.php';

class searchModel{
    protected $searchService;
    
    public function __construct() {
        $this->searchService = new \poi\service\PoiService();
    }
    
    public function getSearchResults($value){
        return $this->searchService->getSearchResults($value);
    }
}
?>
