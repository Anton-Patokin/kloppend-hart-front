<?php
	/*header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");*/
	
    error_reporting(E_ALL); ini_set('display_errors', '1');
    
    chdir(dirname(__FILE__));
    require_once ('/media/drive-sdb1/www/' . 'initSettings.php');
    
    require_once (ROOT . 'schedule/factory/ScheduleFactory.class.php');
    
    $scheduleFactory = new \schedule\factory\ScheduleFactory();
    
    if(isset($_SERVER['argv']) && count($_SERVER['argv']) > 1){
    	$_GET['id'] = $_SERVER['argv'][1];
    }
    
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
        if(file_exists('schedules/'.$schedule->name.'.php') && time() - strtotime($schedule->last_started) > $schedule->time_interval){
            set_time_limit($schedule->time_limit);
            $scheduleFactory->startSchedule($schedule);

            if ($schedule->schedule_id == 4) {
                $lock_file = fopen('lock/yourlock.pid', 'c');
                $got_lock = flock($lock_file, LOCK_EX | LOCK_NB, $wouldblock);
                if ($lock_file === false || (!$got_lock && !$wouldblock)) {
                    throw new Exception(
                        "Unexpected error opening or locking lock file."
                    );
                }
                else if (!$got_lock && $wouldblock) {
                    exit("Another instance is already running; terminating.\n");
                }

                ftruncate($lock_file, 0);
                fwrite($lock_file, getmypid() . "\n"); 
            }

            require_once('schedules/'.$schedule->name.'.php');

            if ($schedule->schedule_id == 4) {
                ftruncate($lock_file, 0);
                flock($lock_file, LOCK_UN);
            }
            
            $scheduleFactory->stopSchedule($schedule);
        }
    }
?>
