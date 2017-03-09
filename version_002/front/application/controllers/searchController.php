<?php

class searchController extends Controller{
    
    public function getSearchResults($value){
        $this->doNotRenderHeader = 1;
        $results = $this->searchModel->getSearchResults($value);
        echo json_encode($results);
    }
    
}
?>
