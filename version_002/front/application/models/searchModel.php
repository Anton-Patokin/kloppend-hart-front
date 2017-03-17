<?php
require_once '../../../poi/service/PoiService.class.php';

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
