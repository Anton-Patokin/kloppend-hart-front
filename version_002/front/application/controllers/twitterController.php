<?php
require_once ROOT_FRONT . DS .'scripts' . DS .'cURL.class.php';

class twitterController extends Controller{
    
    public function twitterFeed($type, $value){
        //ajaxCall, do not render header
        $this->doNotRenderHeader = 1;
        
        $url = "http://labs.edge.be/project/hart-van-antwerpen/twitter/feed/";
        $params = array('type' => $type,'value' => $value);
        
        $curl = new cURL($url);
        $curl->setParams($params);
        $tweets = json_decode($curl->Request());
        
        $results = array();
        $i=0;
        foreach($tweets as $tweet){
            $results[$i]['text'] = $this->parseTweet($tweet->text, $value);
            $results[$i]['date'] = $this->parseAgoDate($tweet->creationDate);
            $results[$i]['img'] = $tweet->authorImg;
            $results[$i]['name'] = $tweet->authorName;
            $results[$i]['screenName'] = $tweet->authorScreenName;
            $results[$i]['tweet_id'] = number_format($tweet->id, 0,'.','');
            $results[$i]['user_id'] = $tweet->authorId;
            $i++;
        }
        echo json_encode($results);
    }
    
    public function index(){
        
    }
    
    private function parseTweet($tweet, $value){
		$tweet = preg_replace("/(https?:\/\/[^\s]+)/", "<a href='\\0' target='_blank'>\\0</a>", $tweet);
		$tweet = preg_replace( "/@([a-zA-Z_\-1-9]+)/", "<a href='https://twitter.com/\\1' target='_blank'>@\\1</a>", $tweet);
		$tweet = preg_replace("/#([a-zA-Z_\-1-9]+)/", "<a href='https://twitter.com/search?q=#\\1&src=hash' target='_blank'>#\\1</a>",$tweet);
		return $tweet;
    }
	
    private function parseAgoDate($date){

            $date = date_parse_from_format ('D M d Y H:i:s', $date);

            $date = mktime($date['hour'], $date['minute'], $date['second'], $date['month'], $date['day'], $date['year']);
            $nowDateTime = new DateTime();

            $difference =  $nowDateTime->getTimestamp() - $date;

            if($difference < 60) $value = "less then a minute ago";
            else if($difference >= 60 && $difference <= 90) $value = "1 minute ago";
            else $value = round($difference / 60) ." minutes ago";

            if($difference >= 60*50 && $difference <= 60*90) $value = "1 hour ago";
            else if($difference > 60*90) $value = round($difference / (60*60)) ." hours ago";

            if($difference >= 60*60*24 && $difference < 60*60*(24*2)) $value = "1 day ago";
            else if($difference >= 60*60*(24*2)) $value = round($difference / (60*60*24)) ." days ago";

            return $value;
    }
}
?>
