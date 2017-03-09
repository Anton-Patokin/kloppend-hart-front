<?php
	ini_set('max_execution_time', 10000);

	for ($i=0; $i < 100; $i++) { 
		echo '-----------------for loop number: ' . $i . '----------------- <br>';
		foreach ([1,2,3] as $value) {
			$ch = curl_init();

			// set URL and other appropriate options
			curl_setopt($ch, CURLOPT_URL, "http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/script/cron/cron.php?id=".$value);
			curl_setopt($ch, CURLOPT_HEADER, 0);

			// grab URL and pass it to the browser
			curl_exec($ch);

			// close cURL resource, and free up system resources
			curl_close($ch);
			echo 'cronjob number: '. $value . '<br>';
		}
	}

?>