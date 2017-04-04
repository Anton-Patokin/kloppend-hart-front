<?php


class sectionController
{

    public function detail_page($number, $horeca, $show, $cafe)
    {

        require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
//	DEFINE('ROOT_FRONT', 'C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\front\\');
        require_once(ROOT_FRONT . '/application/controllers/placeController.php');

        $placeController = new placeController();

        $getCategory = '';
        $getSubcategory = '';
        $getNid = '';
        $subcategories = array();
        $placeInfo = '';
        $message = '';

        if (isset($horeca) && isset($show) && isset($cafe)) {
            if ($show == 'show') {
                $getCategory = $horeca;
                $getSubcategory = $cafe;

                $result = json_decode($placeController->getSubcategories($getCategory));
                foreach ($result as $subcategory) {
                    $subcategories[] = array('database' => $subcategory);
                }
                foreach ($subcategories as $key => $subcategory) {
                    switch ($subcategory['database']) {
                        case 'Youth hostels':
                            $subcategories[$key]['link'] = 'Youth-hostels';
                            break;

                        case 'Bed and Breakfast':
                            $subcategories[$key]['link'] = 'Bed-and-Breakfast';
                            break;

                        case 'Openbare diensten':
                            $subcategories[$key]['link'] = 'Openbare-diensten';
                            break;

                        case 'Openbare Plaatsen':
                            $subcategories[$key]['link'] = 'Openbare-Plaatsen';
                            break;

                        case 'Park/tuin':
                            $subcategories[$key]['link'] = 'Park-tuin';
                            break;

                        case 'Monument/gebouw':
                            $subcategories[$key]['link'] = 'Monument-gebouw';
                            break;

                        case 'Concertzalen/Music Halls':
                            $subcategories[$key]['link'] = 'Concertzalen-Music-Halls';
                            break;

                        case 'Club/Discotheek':
                            $subcategories[$key]['link'] = 'Club-Discotheek';
                            break;

                        case '2de hands':
                            $subcategories[$key]['link'] = '2de-hands';
                            break;

                        default:
                            $subcategories[$key]['link'] = $subcategory['database'];
                            break;
                    }
                }

                $topPlaces = json_decode($placeController->getTopPlacesByCategory($getCategory, $getSubcategory));
            }
            if ($show == 'zoek') {
                $getNid = $cafe;
            }
        }


        include_once ROOT_FRONT . '/application/views/sections/section' . $number . '.php';
    }

    public function everything($number)
    {
        include_once ROOT_FRONT . '/application/views/sections/section' . $number . '.php';
    }

}