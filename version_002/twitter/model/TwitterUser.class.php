<?php

namespace twitter\model;
require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once (ROOT . 'core/model/BaseModel.class.php');

class TwitterUser extends \core\model\BaseModel {
    
    public $id;
    public $name;
    public $screen_name;
    public $description;
    public $verified;
    public $url;
    public $location;
    public $profile_image_url;
    public $creation_date;
    public $followers_count;
    public $friends_count;
    public $statuses_count;
    public $lang;

    public function __construct() {
        parent::__construct();
         $this->meta->propertyTypes = array('id'                => 'int',
                                            'name'              => 'string',
                                            'screen_name'       => 'string',
                                            'description'       => 'string',
                                            'verified'          => 'boolean',
                                            'url'               => 'string',
                                            'location'          => 'string',
                                            'profile_image_url'  => 'string',
                                            'creation_date'     => 'date',
                                            'followers_count'   => 'int',
                                            'friends_count'     => 'int',
                                            'statuses_count'    => 'int',
                                            'lang'              => 'string');
    }
}

?>
