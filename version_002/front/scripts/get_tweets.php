<?php

require_once('twitter_proxy.php');

var_dump('kak');
// Twitter OAuth Config options
$oauth_access_token = '52012026-IR6re0wQXrK3dBhfVi27CjfcKvHmE8EXjQQCBIbCm';
$oauth_access_token_secret = 'jLAnc17IZQMSoGah41PY2uQAcQivX6kPX3863BH00rqgE';
$consumer_key = 'f56gGVr337Cu0Pdrho5UYaaCK';
$consumer_secret = 'dTZKArKAAjp3UzarZlozcolUFAu1VEnQ5pVRdKeoHsrdNqZ891';
$user_id = '52012026';
$screen_name = 'stadantwerpen';
$count = 5;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?screen_name=' . $screen_name . "&count=" . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>