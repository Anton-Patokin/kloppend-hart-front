<?php
//The routing configuration file enables us to specify default controller and action. 
//We can also specify custom redirects using regular expressions. 


$routing = array(
	'/admin\/(.*?)\/(.*?)\/(.*)/' => 'admin/\1_\2/\3'
);


$default['controller'] = 'home';
$default['action'] = 'index';

