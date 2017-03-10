<?php

    require_once(ROOT_FRONT . 'application/new/models/placeModel.php');

    /**
    * 
    */
    class placeController
    {        
        protected $placeModel;

        function __construct()
        {
            $this->placeModel = new placeModel();
        }


        public function getTopPlacesByCategory($category, $subcategory, $ajax = true){
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

    }




?>