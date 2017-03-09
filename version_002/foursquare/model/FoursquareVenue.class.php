<?php
    namespace foursquare\model;
    require_once (ROOT . 'core/model/BaseModel.class.php');
    class FoursquareVenue extends \core\model\BaseModel {        
        
        public $id;
        public $name;
        public $url;
        public $rating;
        public $photos;
        public $mayor;
        public $tips;
        public $location;
        public $stats;
        
        public function __construct() {
            parent::__construct();
             $this->meta->propertyTypes = array(
                 'id'=>'string',
                 'name'=>'string',
                 'url' => 'string',
                 'rating' => 'float',
                 'photos' => 'object',
                 'mayor' => 'object',
                 'tips' => 'object',
                 'location' => 'object',
                 'stats' => 'object',
                 'likes' => 'object'
             );
        }
    }
?>
