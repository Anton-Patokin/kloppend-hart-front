<?php
    require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');

    $getCategory = '';
    $getSubcategory = '';
    $subcategories = array();
    $message = '';

    if (isset($_GET['category']) && isset($_GET['subcategory'])) {
        $getCategory = $_GET['category'];
        $getSubcategory = $_GET['subcategory'];
    }

    $url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/place/getSubcategories/' . $getCategory;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = json_decode(curl_exec($ch), true);
    curl_close($ch);
    foreach ($result as $subcategory) {
        $subcategories[] = array('database' => $subcategory);
    }
    foreach ($subcategories as $key=>$subcategory) {
        // if($subcategory['database'] == 'Youth hostels') $subcategories[$key]['link'] = 'Youth-hostels';
        // if($subcategory['database'] == 'Bed and Breakfast') $subcategories[$key]['link'] = 'Bed-and-Breakfast';
        // if($subcategory['database'] == 'Openbare diensten') $subcategories[$key]['link'] = 'Openbare-diensten';
        // if($subcategory['database'] == 'Openbare Plaatsen') $subcategories[$key]['link'] = 'Openbare-Plaatsen';
        // if($subcategory['database'] == 'Park/tuin') $subcategories[$key]['link'] = 'Park-tuin';
        // if($subcategory['database'] == 'Monument/gebouw') $subcategories[$key]['link'] = 'Monument-gebouw';
        // if($subcategory['database'] == 'Concertzalen/Music Halls') $subcategories[$key]['link'] = 'Concertzalen-Music-Halls';
        // if($subcategory['database'] == 'Club/Discotheek') $subcategories[$key]['link'] = 'club-discotheek';
        // if($subcategory['database'] == '2de hands') $subcategories[$key]['link'] = '2de-hands';
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
                $subcategories[$key]['link'] = 'club-discotheek';
                break;

            case '2de hands':
                $subcategories[$key]['link'] = '2de-hands';
                break;
            
            default:
                $subcategories[$key]['link'] = $subcategory['database'];
                break;
        }
        // if (strpos($subcategory['database'], '/') !== false) {
        //     $linkSubcategory = str_replace('/', '-', $subcategory['database']);
        //     $linkSubcategory = str_replace(' ', '-', $linkSubcategory);
        //     $subcategories[$key]['link'] = $linkSubcategory;
        // }
        // else {
        //     $linkSubcategory = str_replace(' ', '-', $subcategory['database']);
        //     $subcategories[$key]['link'] = $linkSubcategory;
        // }
    }
    
    // var_dump($subcategories);
    // var_dump($subcategories);

    // foreach ($subcategories as $subcategory) {
    //     if (strtolower($subcategory['database']) == strtolower($getSubcategory)) {
    //         $message = 'Subcategory found: ' . $subcategory['database'];
    //     }
    // }

    $url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/place/getTopPlacesByCategory/' . $getCategory . '/' . $getSubcategory;
    // $domain = $_SERVER['HTTP_HOST'] . "/";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $topPlaces = json_decode(curl_exec($ch), true);
    curl_close($ch);

    $url = 'http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/front/application/service/place/getTopPlacesByCategory/uitgaan/bioscoop';
    // $domain = $_SERVER['HTTP_HOST'] . "/";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $test = json_decode(curl_exec($ch), true);
    curl_close($ch);

    var_dump($test);

    // if (strpos($subcategory, '/') !== false) {
    //     $linkSubcategory = str_replace('/', '-', $subcategory)
    //     array_push($linkSubcategory, $linkSubcategory)
    // }
    // else {

    // }

?>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <ol>
                <?php foreach($subcategories as $subcategory): ?>
                    <a href="#section1/<?= $getCategory ?>/<?= $subcategory['link'] ?>"><li><?= $subcategory['database'] ?></li></a>
                    <ul>
                        <?php if(strtolower($subcategory['link']) == strtolower($getSubcategory)): ?>
                            <?php if(isset($topPlaces) && count($topPlaces) > 0): ?>
                                <?php for ($i=0; $i < 10; $i++): ?>
                                    <?php if(isset($topPlaces[$i])): ?>
                                        <li><?= $topPlaces[$i]['name'] ?></li>
                                    <?php endif ?>
                                <?php endfor ?>
                            <?php else: ?>
                                <li>Geen plaatsen</li>
                            <?php endif ?>
                        <?php endif ?>
                    </ul>
                <?php endforeach ?>
            </ol>
            <?= $message ?>
        </div>
    </div>
</div>