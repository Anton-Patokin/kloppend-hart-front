<?php
include_once('/media/drive-sdb1/www/apen.be/htdocs/kloppend-hart-antwerpen/settings.php');
include_once(ROOT . 'twitter/api/TwitterApi.class.php');
$config = array('key' => '47MHPAfhtJE8IGMt5QPAA',
    'secret' => '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8',
    'accessToken' => '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs',
    'accessTokenSecret' => 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI');
$tweet = new \twitter\api\TwitterApi($config['accessToken'], $config['accessTokenSecret'], $config['key'], $config['secret']);
$tweets = $tweet->searchTweetsUsers('frankdeboosere');

$rootPath = "https://apen.be/kloppend-hart-antwerpen/front/";

?>
<div class="section-wrapper weather" ng-init='disableFooter()' ng-controller="WeatherController">
    <div class="container-fluid margin-top-over_map">
        <div class="row">

            <div class="parent">
                <img class="web_cam image1" ng-src="http://webcam.hzs.be/CurrentPic.jpg?{{webcam}}" name="webcam">

                <a href="http://www.buienradar.be" target="_blank"><img class="wheather-img buienradar image3"
                                                                        src="http://api.buienradar.nl/image/1.0/radarmapbe?width=450"></a>

                <div class="image2"></div>
                <!--                <img class="image2" src="https://placehold.it/100" />-->
            </div>
            <!--            <img class="web_cam" ng-src="http://webcam.hzs.be/CurrentPic.jpg?{{webcam}}" name="webcam">-->

        </div>
        <div class="row margin-top-1">
            <div class="weer-title"><h1 class="">Weer</h1></div>
            <div class="col-md-6 margin-top-5">
                <div class="" ng-repeat="weather_result in weather_results">
                    <div ng-if="$index <9">
                        <div ng-class="{'col-sm-6':$index!=0,'col-md-6':$index!=0,'col-md-12':$index==0}">
                            <div class="panel panel-default" id="card">
                                <div class="background panel-heading">{{weather_result.date}}
                                    <i ng-if="$index==0" class="wi wi-{{weather_today.icon}} pull-right">
                                    </i>
                                    <i ng-if="$index != 0"
                                       class="wi wi-{{weather_result.text.split(' ').pop().toLowerCase()}} pull-right"></i>
                                </div>
                                <div class="panel-body center-weather">
                                    <div ng-if="$index==0" class="city">Antwerpen</div>
                                    <div ng-class="{'day-small':$index!=0,'day-big':$index==0}">
                                        {{short_day(weather_result.day)}}
                                    </div>
                                    <div ng-if="$index === 0" class="temp">{{weather_today.temp}} °</div>
                                    <div ng-if="$index != 0">
                                        <div class="temp-min pull-left">Min {{weather_result.low}} °</div>
                                        <div class="temp-max pull-right">Max {{weather_result.high}} °</div>
                                    </div>
                                    <div ng-if="$index==0 ">
                                        <span> <i class="wi wi-strong-wind"></i> {{weather_today.wind}} km/h</span>
                                    </div>
                                    <div ng-if="$index==0 " class="margin-top-10">
                                        <i class="wi wi-sunrise pull-left"> {{ contver_time( weather_today.sunrise)}}
                                            uur</i>
                                        <i class="wi wi-sunset pull-right"> {{contver_time(weather_today.sunset)}}
                                            uur</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 margin-top-5">
                <?php if (!isset($tweets)): ?>
                    <div class="col-md-12">
                        <h1>no tweets are found</h1>
                    </div>
                <?php endif; ?>
                <div class="tweets ">
                    <div class="col-sm-6 col-md-6 ">
                        <?php foreach ($tweets as $key => $value): ?>
                            <?php if ($key % 2 == 0): ?>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <a href="http://twitter.com/<?php echo $value->user->name; ?>"><?php echo $value->user->name; ?></a>
                                        <span class="pull-right twitter-logo"><img
                                                src="<?= $rootPath ?>images/newdesign/twitter-logo.png"></span>
                                    </div>
                                    <div class="panel-body">
                                        <div class="tweet-photo"><img
                                                src="<?php echo $value->user->profile_image_url; ?>"></div>
                                        <div class="tweet-text">
                                            <p><?php echo $value->text; ?></p>
                                            <span class="pull-right"><?php echo $value->created_at; ?></span>
                                        </div>
                                    </div>
                                </div>
                            <?php endif ?>
                        <?php endforeach; ?>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <?php foreach ($tweets as $key => $value): ?>
                            <?php if ($key % 2 == 1): ?>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <a href="http://twitter.com/<?php echo $value->user->name; ?>"><?php echo $value->user->name; ?></a>
                                        <span class="pull-right twitter-logo"><img
                                                src="<?= $rootPath ?>images/newdesign/twitter-logo.png"></span>
                                    </div>
                                    <div class="panel-body">
                                        <div class="tweet-photo"><img
                                                src="<?php echo $value->user->profile_image_url; ?>"></div>
                                        <div class="tweet-text">
                                            <p><?php echo $value->text; ?></p>
                                            <span class="pull-right"><?php echo $value->created_at; ?></span>
                                        </div>
                                    </div>
                                </div>
                            <?php endif ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>