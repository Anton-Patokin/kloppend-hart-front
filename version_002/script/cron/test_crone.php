<?php
ini_set('max_execution_time', 10000);
for ($var =0 ; $var <10 ;$var++){
    foreach ([1,2,3] as $url){
//      echo  curl("http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/script/cron/cron.php?id=".$url);
        $ch = curl_init("http://localhost/edge/projects/kloppend-hart-antwerpen/version_002/script/cron/cron.php?id=".$url);
//        $fp = fopen("cron.php?id=".$url, "w");

//        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_exec($ch);
        curl_close($ch);
//        fclose($fp);
        
    }
}
?>