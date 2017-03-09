<?php
require_once '../../apen/service/ApenService.class.php';

class homeModel extends Model{
    protected $apenService;
    
    public function __construct() {
        parent::__construct();
        $this->apenService = new \apen\service\ApenService();
    }
    
    public function getCategoriesByName($category){
        return $this->apenService->getCategoriesByName($category);
    }
}
?>
