<?php

require_once ROOT_FRONT . '/application/models/homeModel.php';
require_once ROOT_FRONT . '/application/models/placeModel.php';
require_once(ROOT . 'core/config/DBConfig.class.php');
require_once (ROOT. 'util/cURL.class.php');


class testerController
{

    protected $db;
    protected $dbConfig;

    public function __construct()
    {

        $this->dbConfig = new \core\config\DBConfig();
        $this->db = $this->dbConfig->conn();
    }

    public function category($category, $page)
    {
        switch ($category) {
            case 'shopping':
                $category = "winkel";
                break;

            case 'over-de-stad':
                $category = "over_de_stad";
                break;

            case 'vrije-tijd':
                $category = "vrije_tijd";
                break;
        }
        $model = new  homeModel();
        $items = $model->getCategoriesByName($category);


        $page = isset($page) ? $page : 1;
        $current_page = $page;
        $total = count($items); //total items in array
        $limit = 9; //per page
        $totalPages = ceil($total / $limit); //calculate total pages
        $page = max($page, 1); //get 1 page when $_GET['page'] <= 0
        $page = min($page, $totalPages); //get last page when $_GET['page'] > $totalPages
        $offset = ($page - 1) * $limit;
        if ($offset < 0) $offset = 0;
        $items = array_slice($items, $offset, $limit);
        $foreach_last_element = count($items);

        $quick_reply_array = new stdClass();

        $quick_reply_array->messages = [array("text" => "testRedirectInQuickReply", "quick_replies" => [])];

        foreach ($items as $key => $place) {

            switch ($category) {
                case 'horeca':
                    $place = $place->field_soort_horeca_value;
                    break;

                case 'uitgaan':
                    $place = $place->field_soort_uitgaan_value;
                    break;

                case 'cultuur':
                    $place = $place->field_soort_cultuur_value;
                    break;

                case 'over_de_stad':
                    $place = $place->field_soort_over_de_stad_value;
                    break;

                case 'winkel':
                    $place = $place->field_soort_winkel_value;
                    break;

                case 'vrije_tijd':
                    $place = $place->field_soort_vrije_tijd_value;
                    break;
            }
            $top_zaken = "TopZaken";

            if ($key == $foreach_last_element - 1) {
                if ($current_page >= $totalPages) {
                    $place = 1;
                } else {
                    $place = $current_page + 1;
                }
                $top_zaken = 'next_page_' . $place;
            }
            $quick_reply_array->messages[0]["quick_replies"][] = array("set_attributes" => array("typeZaak" => str_replace(array(' ', '/'), '-', $place)), "title" => $place, "block_names" => array($top_zaken));

        }
        echo json_encode($quick_reply_array);
    }

    public function getTopPlaces($category, $subcategory)
    {
        switch ($category) {
            case 'shopping':
                $category = "winkel";
                break;

            case 'over-de-stad':
                $category = "over_de_stad";
                break;

            case 'vrije-tijd':
                $category = "vrije_tijd";
                break;
        }

        if (strtolower($subcategory) == 'youth-hostels') $subcategory = 'Youth hostels';
        if (strtolower($subcategory) == 'bed-and-breakfast') $subcategory = 'Bed and Breakfast';
        if (strtolower($subcategory) == 'openbare-diensten') $subcategory = 'Openbare diensten';
        if (strtolower($subcategory) == 'openbare-plaatsen') $subcategory = 'Openbare Plaatsen';
        if (strtolower($subcategory) == 'park-tuin') $subcategory = 'Park/tuin';
        if (strtolower($subcategory) == 'monument-gebouw') $subcategory = 'Monument/gebouw';
        if (strtolower($subcategory) == 'concertzalen-music-halls') $subcategory = 'Concertzalen/Music Halls';
        if (strtolower($subcategory) == 'club-discotheek') $subcategory = 'Club/Discotheek';
        if (strtolower($subcategory) == '2de-hands') $subcategory = '2de hands';

        $placeModel = new placeModel();

        $topPlaces = $placeModel->getTopPlacesByCategory($category, $subcategory);


        $create_custom_json = ['messages' => []];
        array_push($create_custom_json['messages'],
            ["attachment" => [
                "type" => "template",
                "payload" => ["template_type" => "generic",
                    "elements" => [

                    ]],
            ]]);


        for ($i=0; $i < 9; $i++) {
            if (isset($topPlaces[$i])) {
                $placeImage = $placeModel->getPlaceImageByNid($topPlaces[$i]["nid"], '_original');
                if (!$placeImage) { //IF GEEN IMAGE GEBRUIK GOOGLE IMAGE
                    $url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBgS1zv6lH9C0n0M-ejCbkjkKoA54WS46U&cx=015945210282342840624:ix97xk25vk4&q=" + $topPlaces[$i]["name"] + "&num=1&searchType=image&fileType=jpg&imgSize=xlarge&alt=json";
                    $cURL = new \util\cURL($url);
                    $results =  $cURL->Request();
                    var_dump($results);
                    $placeImage = $data['items'][0]['link'];
                } else {
                    $placeImage = get_object_vars($placeImage);
                    $placeImage = "https://apen.be/".$placeImage["filepath"];
                }

                $placeInfo = $placeModel->getPlaceInfoByNid($topPlaces[$i]["nid"]);

                if (strlen($placeInfo->body) > 80) {
                    $subtitle = strip_tags($placeInfo->body);
                    $subtitle = substr($subtitle, 0, 77) . '...';
                }

                $create_custom_json["messages"][0]["attachment"]["payload"]["elements"][] = array("title" => $topPlaces[$i]["name"], "image_url" => $placeImage, "subtitle" => trim($subtitle), "item_url" => "https://apen.be/node/".$topPlaces[$i]["nid"], "buttons" => [] );

                $create_custom_json["messages"][0]["attachment"]["payload"]["elements"][$i]["buttons"][] = array("type" => "web_url", "url" => "https://apen.be/node/".$topPlaces[$i]["nid"], "title" => "Meer info");
            }
        }

        $count = count($create_custom_json["messages"][0]["attachment"]["payload"]["elements"]);
        $create_custom_json["messages"][0]["attachment"]["payload"]["elements"][] = array("title" => "Kloppend Hart Antwerpen", "image_url" => "https://apen.be/sites/all/themes/zen/apen/site-images/img-logo.png", "subtitle" => "Bekijk de populairste plaatsen in Antwerpen op deze moment", "item_url" => "https://apen.be/kloppend-hart-antwerpen", "buttons" => []);

        $create_custom_json["messages"][0]["attachment"]["payload"]["elements"][$count]["buttons"][] = array("type" => "web_url", "url" => "https://apen.be/kloppend-hart-antwerpen", "title" => "Meer info");

        echo json_encode($create_custom_json);
    }


    public function translate($string)
    {
        if (isset($_POST['string'])) {
            $string= $_POST['string'];

            $word_array = explode(' ', $string);
            $new_fras = [];

            foreach ($word_array as $word) {
                $query = $this->db->prepare('SELECT * FROM antwerps_language WHERE nederlands = "' . $word . '"');
                $query->execute(array());
                $result = $query->fetchAll(\PDO::FETCH_ASSOC);
                if (count($result) && isset($result)) {
                    $word = $result[0]["antwerps"];
                }
                array_push($new_fras, $word);
            }
            echo implode(' ', $new_fras);
        };
    }

}


?>
