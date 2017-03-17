<?php
require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
require_once(ROOT . 'twitter/api/twitterApi.class.php');
$config = array('key' => '47MHPAfhtJE8IGMt5QPAA',
    'secret' => '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8',
    'accessToken' => '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs',
    'accessTokenSecret' => 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI');
$tweet = new \twitter\api\TwitterApi($config['accessToken'], $config['accessTokenSecret'], $config['key'], $config['secret']);
$tweets = $tweet->searchTweetsUsers('frankdeboosere');

?>
<div class="weather">
    <div class="container">
        <div class="row ">
            <div class="col-md-12 margin_top_content">
                <div class="pull-right"><a href="#">x</a></div>
            </div>
        </div>
        <div class="row">
            <?php if (!isset($tweets)): ?>
                <div class="col-md-12">
                    <h1>no tweets are found</h1>
                </div>
            <?php endif; ?>
            <div class="col-md-5">
                <div>
                    <a href="http://www.buienradar.be" target="_blank"><img class="wheather-img buienradar"
                                                                            src="http://api.buienradar.nl/image/1.0/radarmapbe?width=450"></a>
                </div>
                <div>
                    <img class="wheather-img webcam" ng-src="http://webcam.hzs.be/CurrentPic.jpg?{{webcam}}" name="webcam"
                         alt="Picture" border="0" width="620">
                </div>
            </div>
            <div class="col-md-6">
                <?php foreach ($tweets as $key => $value): ?>
                    <div class="col-md-12">
                        <div class="media">
                            <a class="pull-left" href="#">
                                <img class="media-object" data-src="holder.js/64x64"
                                     src="<?php echo $value->user->profile_image_url; ?>">
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading"><?php echo $value->user->name; ?></h4>
                                <?php echo $value->text; ?>
                                <p class="small"><?php echo $value->created_at; ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>

<!---->
<!--<div class="fill background_white">-->
<!--    <div class="pull-right"><a href="#/">x</a></div>-->
<!--    --><?php //if (!isset($tweets)): ?>
<!--        <div class="col-md-12">-->
<!--            <h1>now tweets are found</h1>-->
<!--        </div>-->
<!--    --><?php //endif; ?>
<!--    <div class="col-md-5">-->
<!--        <div>-->
<!--            <a href="http://www.buienradar.be" target="_blank"><img class="wheather-img buienradar"-->
<!--                                                                    src="http://api.buienradar.nl/image/1.0/radarmapbe?width=450"></a>-->
<!--        </div>-->
<!--        <div>-->
<!--            <img class="wheather-img webcam" ng-src="http://webcam.hzs.be/CurrentPic.jpg?{{webcam}}" name="webcam"-->
<!--                 alt="Picture" border="0" width="620">-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="col-md-6">-->
<!--        --><?php //foreach ($tweets as $key => $value): ?>
<!--            <div class="col-md-12">-->
<!--                <div class="media">-->
<!--                    <a class="pull-left" href="#">-->
<!--                        <img class="media-object" data-src="holder.js/64x64"-->
<!--                             src="--><?php //echo $value->user->profile_image_url; ?><!--">-->
<!--                    </a>-->
<!--                    <div class="media-body">-->
<!--                        <h4 class="media-heading">--><?php //echo $value->user->name; ?><!--</h4>-->
<!--                        --><?php //echo $value->text; ?>
<!--                        <p class="small">--><?php //echo $value->created_at; ?><!--</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        --><?php //endforeach; ?>
<!--    </div>-->
<!--</div>-->