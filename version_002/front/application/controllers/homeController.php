<?php
require_once ROOT_FRONT . DS .'scripts' . DS .'weatherStation.class.php';
class homeController extends Controller {
	
	function beforeAction () {

	}

	
	function index() {
             //get all categories
             $categories = array();
             $categories['winkel'] = $this->homeModel->getCategoriesByName('winkel');
             $categories['horeca'] = $this->homeModel->getCategoriesByName('horeca');
             $categories['cultuur'] = $this->homeModel->getCategoriesByName('cultuur');
             $categories['uitgaan'] = $this->homeModel->getCategoriesByName('uitgaan');
             $categories['vrije_tijd'] = $this->homeModel->getCategoriesByName('vrije_tijd');
             $categories['over_de_stad'] = $this->homeModel->getCategoriesByName('over_de_stad');
             $this->set('categories', $categories);
             
             //weatherstation for displaying temperature on left navigation
              $weatherStation = new weatherStation();
              $forecast = $weatherStation->weatherForecast();
              $this->set('weatherForecast', $forecast);
	}

	function afterAction() {

	}


}