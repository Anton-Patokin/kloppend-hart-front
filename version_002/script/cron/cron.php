<?php
	header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

    

    echo "this is cron";
    error_reporting(E_ALL); ini_set('display_errors', '1');
    
    require_once('C:\xampp\htdocs\edge\projects\kloppend-hart-antwerpen\version_002\Settings.php');
    require_once (ROOT . 'core/config/DBConfig.class.php');
    require_once (ROOT . 'schedule/factory/ScheduleFactory.class.php');
    
    $scheduleFactory = new \schedule\factory\ScheduleFactory();
    
    if(isset($_GET['id']) && is_numeric($_GET['id'])){
        $schedule = $scheduleFactory->getScheduleById($_GET['id']);
        executeSchedule($schedule, $scheduleFactory);
    }else{
        $schedules = $scheduleFactory->getAllSchedules();
        /*TODO: check which cron to run instead of always try to run all of them*/
        foreach($schedules as $schedule){
            executeSchedule($schedule, $scheduleFactory);
        }
    }
    
    function executeSchedule($schedule, $scheduleFactory){     
        if(file_exists('schedules/'.$schedule->name.'.php') && strtotime(date('Y-m-d H:i:s')) - strtotime($schedule->last_started) > $schedule->time_interval){
            set_time_limit($schedule->time_limit);
            $scheduleFactory->startSchedule($schedule);                
            require_once('schedules/'.$schedule->name.'.php');
            $scheduleFactory->stopSchedule($schedule);                
        }
    }
?>
