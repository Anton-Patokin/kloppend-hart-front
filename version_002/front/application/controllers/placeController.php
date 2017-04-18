<?php
require_once ROOT_FRONT . '/application/models/homeModel.php';
require_once ROOT_FRONT . '/application/models/placeModel.php';
class placeController {
    
    protected $homeModel;
    protected $placeModel;
    
    public function __construct() {
        $this->placeModel = new placeModel;
        $this->homeModel = new homeModel();
    }
    
    public function getPlaceByNid($nid){
        $this->doNotRenderHeader = 1;
        $place = $this->placeModel->getPlaceByNid($nid);
        echo json_encode($place);
    }
    
    public function getPlaceInfoByNid($nid){
        $this->doNotRenderHeader = 1;
        echo json_encode($this->placeModel->getPlaceInfoByNid($nid));
    }
    
    public function getPlaceNearbyPlacesByNid($nid){
        $this->doNotRenderHeader = 1;
        echo json_encode($this->placeModel->getPlaceNearbyPlacesByNid($nid));
    }
    
    public function getPlaceImageByNid($nid, $size = "slideshow"){
        $this->doNotRenderHeader = 1;
        echo json_encode($this->placeModel->getPlaceImageByNid($nid, $size));
    }
    
    public function getSocialMediaStreamByNid($nid){
        $this->doNotRenderHeader = 1;
        $stream = $this->placeModel->getSocialMediaStreamByNid($nid);
        echo json_encode($stream);
    }
    
    public function getSocialMediaPhotos($nid){
        $this->doNotRenderHeader = 1;
        $photos = $this->placeModel->getSocialMediaPhotos($nid);
        echo json_encode($photos);
    }

    public function getBusinessRating($nid){
        $this->doNotRenderHeader = 1;
        $rating = $this->placeModel->getBusinessRating($nid);
        echo json_encode($rating);
    }

    public function getBusinessIsClosed($nid){
        $this->doNotRenderHeader = 1;
        $is_closed = $this->placeModel->getBusinessIsClosed($nid);
        echo json_encode($is_closed);
    }

    public function getBusinessHours($nid){
        $this->doNotRenderHeader = 1;
        $hours = $this->placeModel->getBusinessHours($nid);
        echo json_encode($hours);
    }

    public function getBusinessPrice($nid){
        $this->doNotRenderHeader = 1;
        $price = $this->placeModel->getBusinessPrice($nid);
        echo json_encode($price);
    }
    
    public function getPlaceStatsByNid($nid){
        //10 days back in time
        $startDate = date('Y-m-d 00:00:00', time() - (10 * (60 * 60 * 24)));
        $endDate   = date('Y-m-d 00:00:00', time());
        
        $this->doNotRenderHeader = 1;
        $stats = $this->placeModel->getPlaceStatsByNid($nid, $startDate, $endDate);
        echo json_encode($stats);
    }
    
    public function getTopPlacesByCategory($category, $subcategory, $ajax = true){
        $this->doNotRenderHeader = 1;
        if($subcategory == 'Youth-hostels') $subcategory = 'Youth hostels';
        if($subcategory == 'Bed-and-Breakfast') $subcategory = 'Bed and Breakfast';
        if($subcategory == 'Openbare-diensten') $subcategory = 'Openbare diensten';
        if($subcategory == 'Openbare-Plaatsen') $subcategory = 'Openbare Plaatsen';
        if($subcategory == 'Bed-and-Breakfast') $subcategory = 'Bed and Breakfast';
        if($subcategory == 'Park-tuin') $subcategory = 'Park/tuin';
        if($subcategory == 'Monument-gebouw') $subcategory = 'Monument/gebouw';
        if($subcategory == 'Concertzalen-Music-Halls') $subcategory = 'Concertzalen/Music Halls';
        if($subcategory == 'Club-Discotheek') $subcategory = 'Club/Discotheek';
        if($subcategory == '2de-hands') $subcategory = '2de hands';
        
        $topPlaces = $this->placeModel->getTopPlacesByCategory($category, $subcategory);
        if($ajax) return json_encode($topPlaces);
        else return $topPlaces;
    }

    public function getSubcategories($category){
            $subCategories = $this->homeModel->getCategoriesByName($category);
            $objectName = 'field_soort_' . $category . '_value';
            $category = array();
            foreach ($subCategories as $subCategory) {
                array_push($category, $subCategory->$objectName);
            }
            return json_encode($category);
        }
    
    public function getPlaceTotalMetricsByNid($nid){
         $this->doNotRenderHeader = 1;
         $totalMetrics =   $this->placeModel->getPlaceTotalMetricsByNid($nid);
         echo json_encode($totalMetrics);
    }
    
    public function getCategoryByNid($nid){
        $this->doNotRenderHeader = 1;
        $categories = array();
        $category = $this->placeModel->getCategoryByNid($nid);
        $subcategories = $this->homeModel->getCategoriesByName($category);
        $categories[$category] = array();
        foreach($subcategories as $subcategory){
            $subcategoryArray = get_object_vars ($subcategory);
            $categories[$category][reset($subcategoryArray)] = array();
            $categories[$category][reset($subcategoryArray)]  = $this->getTopPlacesByCategory($category, reset($subcategoryArray), false);
        }
        echo json_encode($categories);
    }
    
    public function getCompetitors($nid){
        
    }
    
}
?>
