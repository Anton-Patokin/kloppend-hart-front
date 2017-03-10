<?php
require_once (ROOT. '/apen/service/ApenService.class.php');

class homeModel{
    
    public function __construct() {
 
        $this->apenService = new \apen\service\ApenService();
    }
    
    public function getCategoriesByName($category){
        return $this->apenService->getCategoriesByName($category);
    }
}
?>
