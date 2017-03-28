<?php 

require_once ROOT_FRONT . '/application/models/homeModel.php';
require_once ROOT_FRONT . '/application/models/placeModel.php';

	class testerController{
			
			public function test(){
				// $test = json_encode(array("messages" => array("text" => "testRedirectInQuickReply", "quick_replies" => array("title" => "restaurant", "block_name" => "TopZaken"))));
				// echo $test;
				$test = '{
	"messages": [
		{
			"text": "testRedirectInQuickReply",
			"quick_replies": [
				{
					"set_attributes": {
						"typeZaak": "restaurant"
					},
					"title": "restaurant",
					"block_names": [
						"TopZaken"
					]
				}
			]
		}
	]
}';
			// $test = json_encode($test);
		//       echo json_decode($test);
			// echo json_encode($test);
echo $test;
			}

			public function test2() {
				$test2 = ';{
					"messages": [{
						"attachment":{
							"type":"template",
							"payload":{
								"template_type":"generic",
								"elements":[{

								}]
							}
						}
					}]
				}';
				$test3 = '{
	"messages": [
		{
			"attachment": {
				"type": "template",
				"payload": {
					"template_type": "generic",
					"elements": [
						{
							"title": "Barnini",
							"image_url": "http://ontbijteninantwerpen.be/wp-content/uploads/2016/03/barnini1.jpg",
							"subtitle": "test subtitle",
							"item_url": "https://apen.be/barnini-restaurant-antwerpen",
							"buttons": [
								{
									"type": "web_url",
									"url": "https://apen.be/barnini-restaurant-antwerpen",
									"title": "Meer info"
								}
							]
						},
						{
							"title": "Het pomphuis",
							"image_url": "http://assets.digi.persgroep.be/location_photo/w500/22/L_0000043022.jpg",
							"subtitle": "test subtitle",
							"item_url": "https://apen.be/pomphuis-restaurant-haven-antwerpen",
							"buttons": [
								{
									"type": "web_url",
									"url": "https://apen.be/pomphuis-restaurant-haven-antwerpen",
									"title": "Meer info"
								}
							]
						}
					]
				}
			}
		}
	]
}
';
			echo $test3;
		}


		public function category($category)
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

			$model =new  homeModel();
			$items = $model->getCategoriesByName($category);

			$quick_reply_array = new stdClass();

			$quick_reply_array->messages = [array("text" => "testRedirectInQuickReply", "quick_replies"=>[])];

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
					$quick_reply_array->messages[0]["quick_replies"][] = array("set_attributes"=>array("typeZaak" => str_replace(array(' ', '/'), '-', $place)), "title" => $place, "block_names" => array("TopZaken"));
			}
			echo json_encode($quick_reply_array);
		}

		public function getTopPlaces($category, $subcategory){
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

			if(strtolower($subcategory) == 'youth-hostels') $subcategory = 'Youth hostels';
	        if(strtolower($subcategory) == 'bed-and-breakfast') $subcategory = 'Bed and Breakfast';
	        if(strtolower($subcategory) == 'openbare-diensten') $subcategory = 'Openbare diensten';
	        if(strtolower($subcategory) == 'openbare-plaatsen') $subcategory = 'Openbare Plaatsen';
	        if(strtolower($subcategory) == 'park-tuin') $subcategory = 'Park/tuin';
	        if(strtolower($subcategory) == 'monument-gebouw') $subcategory = 'Monument/gebouw';
	        if(strtolower($subcategory) == 'concertzalen-music-halls') $subcategory = 'Concertzalen/Music Halls';
	        if(strtolower($subcategory) == 'club-discotheek') $subcategory = 'Club/Discotheek';
	        if(strtolower($subcategory) == '2de-hands') $subcategory = '2de hands';

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
					if (!$placeImage) {
						$placeImage["filepath"] = "sites/all/themes/zen/apen/site-images/img-logo.png";
					} else {
						$placeImage = get_object_vars($placeImage);
					}

					$placeInfo = $placeModel->getPlaceInfoByNid($topPlaces[$i]["nid"]);

					if (strlen($placeInfo->body) > 80) {
						$subtitle = strip_tags($placeInfo->body);
						$subtitle = substr($subtitle, 0, 77) . '...';
					}

					$create_custom_json["messages"][0]["attachment"]["payload"]["elements"][] = array("title" => $topPlaces[$i]["name"], "image_url" => "https://apen.be/".$placeImage["filepath"], "subtitle" => trim($subtitle), "item_url" => "https://apen.be/node/".$topPlaces[$i]["nid"], "buttons" => [] );

					$create_custom_json["messages"][0]["attachment"]["payload"]["elements"][$i]["buttons"][] = array("type" => "web_url", "url" => "https://apen.be/node/".$topPlaces[$i]["nid"], "title" => "Meer info");
				}
			}

			$count = count($create_custom_json["messages"][0]["attachment"]["payload"]["elements"]);
			$create_custom_json["messages"][0]["attachment"]["payload"]["elements"][] = array("title" => "Kloppend Hart Antwerpen", "image_url" => "https://apen.be/sites/all/themes/zen/apen/site-images/img-logo.png", "subtitle" => "Bekijk de populairste plaatsen in Antwerpen op deze moment", "item_url" => "https://apen.be/kloppend-hart-antwerpen", "buttons" => [] );

			$create_custom_json["messages"][0]["attachment"]["payload"]["elements"][$count]["buttons"][] = array("type" => "web_url", "url" => "https://apen.be/kloppend-hart-antwerpen", "title" => "Meer info");

			echo json_encode($create_custom_json);
		}

	}


?>
