<?php

namespace schedule\factory;

require_once(ROOT . 'core/factory/GenericFactory.class.php');
require_once(ROOT . 'schedule/dao/ScheduleDAO.class.php');
require_once(ROOT . 'schedule/model/Schedule.class.php');

class ScheduleFactory extends \core\factory\GenericFactory{
    
    public function __construct(){
        parent::__construct(new \schedule\model\Schedule());
	$this->dao = new \schedule\dao\ScheduleDAO();
    }
    
    public function getAllSchedules(){
        return $this->toArray($this->dao->getAllSchedules());
    }
    
    public function getScheduleById($scheduleId){
        return $this->toObject($this->dao->getById($scheduleId)); 
    }
    
    public function startSchedule($schedule){    
         if(strtotime($schedule->last_started) > strtotime($schedule->last_stopped) && strtotime(date('Y-m-d H:i:s')) - strtotime($schedule->last_started) < $schedule->time_limit){
            // throw new \Exception("Schedule with id " . $schedule->schedule_id . " and name " . $schedule->name . " might still be running for the next ". (time() - $schedule->last_started - $schedule->time_limit." seconds."));
            throw new \Exception("Schedule with id " . $schedule->schedule_id . " and name " . $schedule->name . " might still be running for the next " . (strtotime(date('Y-m-d H:i:s')) - strtotime($schedule->last_started) - $schedule->time_limit . " seconds."));

            // throw new \Exception("Schedule with id $schedule->schedule_id and name $schedule->name might still be running for the next ". (time() - $schedule->last_started) - $schedule->time_limit." seconds.");
        }
        
        $this->dao->startScheduleById($schedule->schedule_id);
    }
    
    public function stopSchedule($schedule){
        $this->dao->stopScheduleById($schedule->schedule_id);
    } 
}
?>
