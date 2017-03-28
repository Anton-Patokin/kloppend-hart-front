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
			$placeModel = new placeModel();

			$test = $placeModel->getTopPlacesByCategory($category, $subcategory);

			// var_dump($test[0]);

			$creat_custom_json = ['messages' => []];
			array_push($creat_custom_json['messages'],
			["attachment" => [
			"type" => "template",
			"payload" => ["template_type" => "generic",
			"elements" => [

			]],
			]]);

			echo json_encode($creat_custom_json["messages"][0]["attachment"]["payload"]["elements"]);
		}

	}


?>
