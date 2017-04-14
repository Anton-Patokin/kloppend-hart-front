<?php
namespace instagram\model;

require_once (ROOT . 'core/model/BaseModel.class.php');

class InstagramMedia extends \core\model\BaseModel{
    public $instagram_media_id;
    public $tags;
    public $location;
    public $created_time;
    public $link;
    public $likes;
    public $low_resolution_image;
    public $thumbnail;
    public $standard_resolution_image;
    public $caption;
    public $user;
    public $type;
    
    public function __construct(){
        parent::__construct();
        $this->meta->propertyTypes['instagram_media_id'] = 'string';
        $this->meta->propertyTypes['created_time'] = 'date';
        $this->meta->propertyTypes['caption'] = 'string';
        $this->meta->propertyTypes['low_resolution_image'] = 'string';
        $this->meta->propertyTypes['standard_resolution_image'] = 'string';
        $this->meta->propertyTypes['thumbnail'] = 'string';
        $this->meta->propertyTypes['likes'] = 'int';
        $this->meta->propertyTypes['link'] = 'string';
        $this->meta->propertyTypes['user'] = 'object';
        $this->meta->propertyTypes['tags'] = 'string';
        $this->meta->propertyTypes['location'] = 'object';
        $this->meta->propertyTypes['type'] = 'string';
        
    }
}

?>
