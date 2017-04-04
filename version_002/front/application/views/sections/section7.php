<?php
	require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
	require_once(ROOT . 'twitter/api/twitterApi.class.php');
	$config = array('key' => '47MHPAfhtJE8IGMt5QPAA',
	    'secret' => '4OHIhz8AZUD5dYX9HfVn7enEfZGRg3MxgyFQWVoN8',
	    'accessToken' => '52012026-G16Pi0u3JLRaDmPKPbMKAbMzigCKNlwRyuet4ssBs',
	    'accessTokenSecret' => 'qU3W2AkC2PnZ8ZRiMDVGTAysCEEvavSU26g6TVWDWI');

	$twitterApi = new \twitter\api\TwitterApi($config['accessToken'], $config['accessTokenSecret'], $config['key'], $config['secret']);

	$tweets = array();
	$tweetsToSearch = array('verkeerAntwerpenTweets' => 'Verkeer Antwerpen', 'verkeerscentrumAntwerpenTweets' => 'Verkeerscentrum Antwerpen', 'ringAntwerpenTweets' => 'Ring Antwerpen');
	foreach ($tweetsToSearch as $key => $value) {
		$tweets[$key]['tweet'] = $twitterApi->searchTweets($value);
		$className = strtolower(str_replace(' ', '-', $value));
		$tweets[$key]['class_name'] = $className;
		$tweets[$key]['title'] = $value;	
	}

	
	// $verkeerAntwerpenTweets = $tweet->searchTweets('verkeer antwerpen');
	// $verkeerscentrumAntwerpenTweets = $tweet->searchTweets('verkeerscentrum antwerpen');
	// $ringAntwerpenTweets = $tweet->searchTweets('ring antwerpen');
	// var_dump($verkeerAntwerpenTweets->statuses);
?>
<div class="section-wrapper verkeer" ng-init='disableFooter();toggle_show_traffic(true)'>
	<div class="container-fluid">
		<div class="col-md-12 tweets">
			<?php foreach($tweets as $key => $tweet): ?>
				<div id="<?= $key ?>" class="row">
					<div class="tweet-title"><h2><?= $tweet['title'] ?></h2></div>
					<div class="col-sm-6 col-md-3">
						<?php foreach($tweet["tweet"]->statuses as $key => $status): ?>
							<?php if($key % 4 == 0): ?>
								
								<div class="panel panel-default">
									<div class="panel-heading">
										<a href="http://twitter.com/<?= $status->user->screen_name ?>"><?= $status->user->screen_name ?></a>
										<span class="pull-right twitter-logo"><img src="images/newdesign/twitter-logo.png"></span>
									</div>
									<div class="panel-body">
										<div class="tweet-photo"><img src="<?= $status->user->profile_image_url ?>"></div>
										<div class="tweet-text">
											<p><?= $status->text ?></p>
											<span class="pull-right"><?= $status->created_at ?></span>
										</div>
									</div>
								</div>
								
							<?php endif ?>
						<?php endforeach ?>
					</div>
					<div class="col-sm-6 col-md-3">
						<?php foreach($tweet["tweet"]->statuses as $key => $status): ?>
							<?php if($key % 4 == 1): ?>
								
								<div class="panel panel-default">
									<div class="panel-heading">
										<a href="http://twitter.com/<?= $status->user->screen_name ?>"><?= $status->user->screen_name ?></a>
										<span class="pull-right twitter-logo"><img src="images/newdesign/twitter-logo.png"></span>
									</div>
									<div class="panel-body">
										<div class="tweet-photo"><img src="<?= $status->user->profile_image_url ?>"></div>
										<div class="tweet-text">
											<p><?= $status->text ?></p>
											<span class="pull-right"><?= $status->created_at ?></span>
										</div>
									</div>
								</div>
								
							<?php endif ?>
						<?php endforeach ?>
					</div>
					<div class="col-sm-6 col-md-3">
						<?php foreach($tweet["tweet"]->statuses as $key => $status): ?>
							<?php if($key % 4 == 2): ?>
								
								<div class="panel panel-default">
									<div class="panel-heading">
										<a href="http://twitter.com/<?= $status->user->screen_name ?>"><?= $status->user->screen_name ?></a>
										<span class="pull-right twitter-logo"><img src="images/newdesign/twitter-logo.png"></span>
									</div>
									<div class="panel-body">
										<div class="tweet-photo"><img src="<?= $status->user->profile_image_url ?>"></div>
										<div class="tweet-text">
											<p><?= $status->text ?></p>
											<span class="pull-right"><?= $status->created_at ?></span>
										</div>
									</div>
								</div>
								
							<?php endif ?>
						<?php endforeach ?>
					</div>
					<div class="col-sm-6 col-md-3">
						<?php foreach($tweet["tweet"]->statuses as $key => $status): ?>
							<?php if($key % 4 == 3): ?>
								
								<div class="panel panel-default">
									<div class="panel-heading">
										<a href="http://twitter.com/<?= $status->user->screen_name ?>"><?= $status->user->screen_name ?></a>
										<span class="pull-right twitter-logo"><img src="images/newdesign/twitter-logo.png"></span>
									</div>
									<div class="panel-body">
										<div class="tweet-photo"><img src="<?= $status->user->profile_image_url ?>"></div>
										<div class="tweet-text">
											<p><?= $status->text ?></p>
											<span class="pull-right"><?= $status->created_at ?></span>
										</div>
									</div>
								</div>
								
							<?php endif ?>
						<?php endforeach ?>
					</div>
				</div>
			<?php endforeach ?>
		</div>
	</div>
</div>