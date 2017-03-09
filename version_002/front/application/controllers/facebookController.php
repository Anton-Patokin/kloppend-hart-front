<?php
class facebookController extends Controller{
    
    public function getFacebookLikes($startDate, $endDate){
        $this->doNotRenderHeader = 1;
        $metrics = $this->facebookModel->getFacebookMetricByNameByTimeRange('like', $startDate, $endDate);
        var_dump($metrics);
    }
    
    public function getFacebookCheckins($startDate, $endDate){
        $this->doNotRenderHeader = 1;
        $metrics = $this->facebookModel->getFacebookMetricByNameByTimeRange('checkin', $startDate, $endDate);
        var_dump($metrics);
    }
    
    public function getFacebookTalkingAbouts($startDate, $endDate){
        $this->doNotRenderHeader = 1;
        $metrics = $this->facebookModel->getFacebookMetricByNameByTimeRange('talking_about', $startDate, $endDate);
        var_dump($metrics);
    }
    
}
?>