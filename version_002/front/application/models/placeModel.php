<?php
require_once ROOT . '/apen/service/ApenService.class.php';
require_once ROOT . '/poi/service/PoiService.class.php';
require_once ROOT . '/foursquare/service/FoursquareService.class.php';
require_once ROOT . '/yelp/service/YelpService.class.php';
require_once ROOT . '/google/places/service/GoogleService.class.php';
require_once ROOT . '/aggregated/service/PoiStatsTimeAggregatedService.class.php';
require_once 'foursquareModel.php';
require_once 'facebookModel.php';

class placeModel{
    protected $apenService;
    protected $foursquareService;
    protected $poiStatsTimeAggregatedService;
    protected $poiService;
    protected $foursquareModel;
    protected $facebookModel;
    protected $yelpService;
    protected $googleService;
    
    public function __construct() {
        $this->apenService = new \apen\service\ApenService();
        $this->poiStatsTimeAggregatedService = new \aggregated\service\PoiStatsTimeAggregatedService();
        $this->poiService = new \poi\service\PoiService();
        $this->foursquareService = new \foursquare\service\FoursquareService();
        $this->foursquareModel = new foursquareModel();
        $this->facebookModel = new facebookModel();
        $this->yelpService = new \yelp\service\YelpService();
        $this->googleService = new \google\places\service\GoogleService();
    }
    
    public function getPlaceByNid($nid){
        $place = array();
        $place['node'] = $this->apenService->getPlaceByNid($nid);
        $place['points'] = $this->poiService->getNearbyPlacesByNid($nid);
        $place['image']  = $this->apenService->getImageByNid($nid);
        return $place;
    }
    
    public function getPlaceInfoByNid($nid){
        return $this->apenService->getPlaceByNid($nid);
    }
    
    public function getPlaceNearbyPlacesByNid($nid){
        return $this->poiService->getNearbyPlacesByNid($nid);
    }
    
    public function getPlaceImageByNid($nid, $size = "slideshow"){
        return $this->apenService->getImageByNid($nid, $size);
    }
    
    public function getSocialMediaStreamByNid($nid){
        $stream = array();
        $stream['foursquare'] = $this->foursquareService->getFoursquareTipsByNid($nid);
        return $stream;
    }
    
    public function getSocialMediaPhotos($nid){
        $photos = array();
        $photos['foursquare'] = $this->foursquareService->getFoursquarePhotosByNid($nid);
        return $photos;
    }

    public function getBusinessRating($nid) {
        $rating = $this->yelpService->getYelpRatingByNid($nid);
        return $rating;
    }

    public function getBusinessIsClosed($nid) {
        $is_closed = $this->yelpService->getYelpIsClosedByNid($nid);
        return $is_closed;
    }

    public function getBusinessHours($nid) {
        $hours = $this->yelpService->getYelpHoursByNid($nid);
        return $hours;
    }

    public function getBusinessPrice($nid) {
        $price = $this->yelpService->getYelpPriceByNid($nid);
        return $price;
    }

    public function getPlaceRating($nid) {
        $rating = $this->googleService->getGoogleRatingByNid($nid);
        return $rating;
    }

    public function getPlaceHours($nid) {
        $hours = $this->googleService->getGoogleHoursByNid($nid);
        return $hours;
    }
    
    public function getPlaceStatsByNid($nid, $startDate, $endDate){
        $metrics = array();
        $metrics['foursquare'] = $this->poiStatsTimeAggregatedService->getStatsBySourceNameByNidByTimeRange('foursquare', $nid, $startDate, $endDate);
        $metrics['facebook']   = $this->poiStatsTimeAggregatedService->getStatsBySourceNameByNidByTimeRange('facebook',$nid, $startDate, $endDate);
        $metrics['apen']   = $this->poiStatsTimeAggregatedService->getStatsBySourceNameByNidByTimeRange('apen',$nid, $startDate, $endDate);
        //$metrics['instagram']   = $this->poiStatsTimeAggregatedService->getStatsBySourceNameByNidByTimeRange('instagram',$nid, $startDate, $endDate);
        // $metrics['twitter']   = $this->poiStatsTimeAggregatedService->getStatsBySourceNameByNidByTimeRange('twitter',$nid, $startDate, $endDate);
        
        
        
       
        //format $metrics by date
        $result = array();
        foreach($metrics as $metric => $value){
            if(!empty($value)){
                foreach($value as $val){
                     $result[$val->date][$metric]['total_value'] = $val->total_value;
                     $result[$val->date][$metric]['total_differential'] = $val->differential_total;
                }
            }
        }
        return $result;
    }
    
    public function getTopPlacesByCategory($category, $subcategory){
        $startDate = date('Y-m-d 00:00:00', time());
        $endDate   = date('Y-m-d 00:00:00', time() + 86400);
        return $this->poiService->getTopPlacesByCategory($category, $subcategory, $startDate, $endDate);
    }
    
    public function getCategoryByNid($nid){
        return $this->apenService->checkCategoryByNid($nid);
    }
    
    public function getPlaceTotalMetricsByNid($nid){
        return $this->poiStatsTimeAggregatedService->getPlaceTotalMetricsByNid($nid);
    }
}
?>
