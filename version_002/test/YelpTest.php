<?php

    require_once ('../apen/factory/ApenLocatedNodeFactory.class.php');
    require_once ('../yelp/api/YelpApi.class.php');
    $apenFactory = new \apen\factory\ApenLocatedNodeFactory();
    $apenLocations = $apenFactory->createAllLocatedNodes();
    echo '<pre>';
   // var_dump($apenLocations);
    $api = new yelp\api\YelpApi();
    for ($index = 0; $index < 10; $index++) {
        $location = $apenLocations[$index];
        if(!empty($location->latitude) && !empty($location->longitude)){
         var_dump($location);
         $result = $api->searchCoordinate($location->latitude, $location->longitude);
         var_dump($result);
        }
    }
    echo '</pre>';
?>
