<?php


require_once('twitter_proxy.php');


class twitter_api
{

    // var_dump('test');
// Twitter OAuth Config options
    protected $oauth_access_token = '52012026-IR6re0wQXrK3dBhfVi27CjfcKvHmE8EXjQQCBIbCm';
    protected $oauth_access_token_secret = 'jLAnc17IZQMSoGah41PY2uQAcQivX6kPX3863BH00rqgE';
    protected $consumer_key = 'f56gGVr337Cu0Pdrho5UYaaCK';
    protected $consumer_secret = 'dTZKArKAAjp3UzarZlozcolUFAu1VEnQ5pVRdKeoHsrdNqZ891';
    protected $user_id = '52012026';
    protected $screen_name = 'stadantwerpen';
    protected $count = 10;

    public function __construct()
    {
    }

    function get_tweets($type, $value)
    {
        if ($type == 'statuses/user_timeline.json') {
            $twitter_url = $type; //'statuses/user_timeline.json'
            $twitter_url .= '?screen_name=' . $value . "&count=" . $this->count;
        } elseif ($type == 'search/tweets.json') {
            $value = str_replace(' ', '%20', $value);

            $twitter_url = $type; //'statuses/user_timeline.json'
            $twitter_url .= '?q=' . $value . "&count=" . $this->count;
        }

        // Create a Twitter Proxy object from our twitter_proxy.php class
        $twitter_proxy = new TwitterProxy(
            $this->oauth_access_token,            // 'Access token' on https://apps.twitter.com
            $this->oauth_access_token_secret,        // 'Access token secret' on https://apps.twitter.com
            $this->consumer_key,                    // 'API key' on https://apps.twitter.com
            $this->consumer_secret,                // 'API secret' on https://apps.twitter.com
            $this->user_id,                        // User id (http://gettwitterid.com/)
            $this->screen_name,                    // Twitter handle
            $this->count                            // The number of tweets to pull out
        );

// Invoke the get method to retrieve results via a cURL request
        $tweets = $twitter_proxy->get($twitter_url);

        if (isset($tweets)) {
            return $tweets;
        }
    }



}
?>