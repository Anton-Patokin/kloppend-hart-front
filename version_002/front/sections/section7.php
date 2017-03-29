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
<div class="verkeer">
	<div class="container-fluid">
		<div class="nav-tweets">
			<ul>
				<?php foreach($tweets as $tweet): ?>
					<a href="#section7#<?= $tweet['class_name'] ?>"><li><?= $tweet['title'] ?></li></a>
				<?php endforeach ?>
			</ul>
		</div>
		<?php foreach($tweets as $key => $tweet): ?>
			<div class="row">
				<div class="col-md-12">
					<div id="<?= $tweet['class_name'] ?>">
						<h2><?= $tweet['title'] ?></h2>
						<?php foreach($tweet['tweet']->statuses as $key => $status): ?>
							<?php if($key % 2 == 0): ?> 
								<div class="row">
							<?php endif ?>
								<div class="col-md-6 tweet">
									<a href="http://twitter.com/<?= $status->user->screen_name ?>">
										<h4>
											<img src="<?= $status->user->profile_image_url ?>">
											<?= $status->user->name ?>
										</h4>
									</a>
									<p><?= $status->text ?></p>
									<p><?= $status->created_at ?></p>
								</div>
							<?php if($key % 2 != 0): ?>
								</div>
							<?php endif ?>
						<?php endforeach ?>
					</div>
				</div>
			</div>
		<?php endforeach ?>
	</div>
</div>