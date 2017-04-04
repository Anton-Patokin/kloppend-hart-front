<?php
require_once('/media/drive-sdb1/www/apen.be/htdocs/kloppend-hart-antwerpen/settings.php');
require_once ROOT . '/apen/service/ApenService.class.php';

class homeModel{

    public function __construct() {

        $this->apenService = new \apen\service\ApenService();
    }

    public function getCategoriesByName($category){
        return $this->apenService->getCategoriesByName($category);
    }
}
?>
