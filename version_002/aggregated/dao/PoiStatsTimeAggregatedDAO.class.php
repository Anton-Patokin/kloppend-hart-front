<?php
namespace aggregated\dao;
include_once(ROOT . 'core/dao/GenericDAO.class.php');
require_once(ROOT . 'core/config/DBConfig.class.php');

class PoiStatsTimeAggregatedDAO extends \core\dao\GenericDAO
{
    public function __construct()
    {
        global $pdo;
        parent::init($pdo, 'poi_stats_time_aggregated');
    }

    public function getAll()
    {
        return parent::getAll();
    }

    public function insertRecord($properties)
    {
        parent::insertRecord($properties);
    }

    public function insertRecords($array)
    {
        parent::insertRecords($array);
    }

    public function getByPrimaryKey($values, $identifiers)
    {
        return parent::getByPrimaryKey($values, $identifiers);
    }

    public function getPositionsByNid($nid, $startDate, $endDate)
    {

    }

    public function getStatsBySourceReferencePoiMetricIdByTimeRange($sourceReferencePoiMetricId, $startDate, $endDate)
    {

        $sql = "";

        $startDate = new \DateTime($startDate);
        $endDate = new \DateTime($endDate);
        $interval = $startDate->diff($endDate);

        for ($i = 0; $i < $interval->d; $i++) {

            $queryDate = date('Ymd', $startDate->getTimestamp() + ($i * 86400));
            $sql .= "select source_reference_poi_metric_id, total_value, COALESCE(differential_total, 0) as differential_total, DATE(COALESCE(max, CURDATE())) date from (select source_reference_poi_metric_id, SUM(differential_value) as differential_total, total_value, max(from_time) max from poi_stats_time_aggregated_" . $queryDate . " where source_reference_poi_metric_id = " . $sourceReferencePoiMetricId . ") a
                             UNION ";
        }

        $sql .= "select source_reference_poi_metric_id, total_value, COALESCE(differential_total, 0) as differential_total, DATE(COALESCE(max, CURDATE())) date from (select source_reference_poi_metric_id, SUM(differential_value) as differential_total, total_value, max(from_time) max from poi_stats_time_aggregated where source_reference_poi_metric_id = " . $sourceReferencePoiMetricId . ") a";

        $query = $this->DB->prepare($sql);

        $succes = $query->execute();
        if (!$succes) {
            die('error');
            return;
        }
        return $query->fetchAll(\PDO::FETCH_OBJ);
    }

    public function getAggregatedPoiStatsTimeByMetricBySourceByTimeRange($metric_name, $sourceId, $startDate, $endDate)
    {
        $beginDay = new \DateTime(date('Y-m-d', time()));
        $beginStartDay = new \DateTime(date('Y-m-d', strtotime($startDate)));
        $table = $this->table;
        //if date is older then today, check if archived aggregated table exists
        if ($beginStartDay->getTimestamp() < $beginDay->getTimestamp()) {
            $tableSuffix = date('Ymd', strtotime($startDate));
            $query = $this->DB->prepare("SHOW TABLES LIKE 'poi_stats_time_aggregated_$tableSuffix'");
            $query->execute();
            $table = $query->fetchColumn();
            if (empty($table)) {
                //throw new \Exception("No data for this date");
                die('{"error":"No data for this date"}');
            }
        }

        $query = $this->DB->prepare("SELECT (coalesce(overall_weight_custom, overall_weight, 1) * differential_value) overall_weight, (coalesce(real_time_weight_custom, real_time_weight, 1) * differential_value) real_time_weight, 
                                               (coalesce(future_weight_custom, future_weight, 1) * differential_value) future_weight, metric_name, differential_value, from_time, to_time, p.poi_id, name, nid, longitude, latitude, marker_type
                                        FROM source_metric sm
                                            JOIN source_reference_poi_metric srpm ON sm.metric_id = srpm.metric_id 
                                            JOIN $table psta ON psta.source_reference_poi_metric_id = srpm.source_reference_poi_metric_id 
                                            JOIN source_reference_poi srp ON srp.source_reference_poi_id = srpm.source_reference_poi_id
                                            JOIN poi p ON p.poi_id = srp.poi_id
                                            LEFT JOIN weight_metric wm on wm.metric_id = sm.metric_id
                                            WHERE source_id = ?
                                            AND metric_name = ?
                                            AND differential_value > 3
                                            AND (psta.from_time >= ? AND psta.to_time <= ? )");
        $succes = $query->execute(array($sourceId, $metric_name, $startDate, $endDate));
        if (!$succes) {
            die('error');
            return;
        }
        return $query->fetchAll(\PDO::FETCH_OBJ);

    }

    public function getAvgPoiStatsTimeBySourceReferencePoiMetricIdByWeekDayByTimeRange($sourceReferencePoiMetricId, $weekday, $from, $to)
    {
        $query = $this->DB->prepare("SELECT AVG(differential_value) as avg FROM
                (SELECT * FROM poi_stats_time_aggregated 
                WHERE WEEKDAY(from_time) + 1 = ? 
                AND DATE(from_time) BETWEEN ? AND ? 
                AND source_reference_poi_metric_id = ?) d
                WHERE DATE_FORMAT(from_time,'%T') >= ? 
                AND DATE_FORMAT(to_time,'%T') <= ?");

        $succes = $query->execute(array($weekday, date('Y-m-d', strtotime($from)), date('Y-m-d', strtotime($to)), $sourceReferencePoiMetricId, date('H:i:s', strtotime($from)), date('H:i:s', strtotime($to))));
        if (!$succes) {
            die('error');
            return;
        }
        return $query->fetch(\PDO::FETCH_OBJ);
    }

    /*delete poi_stats which are already aggregated since [date]*/
    public function deleteAggregatedStatsFromPoiStats($from)
    {
        $query = $this->DB->prepare("DELETE FROM poi_stats WHERE source_reference_poi_metric_id IN (
											SELECT source_reference_poi_metric_id FROM poi_stats_time_aggregated
		  									WHERE from > ?
										)");
        $succes = $query->execute(array($from));
        return $success;
    }

    public function getPlaceTotalMetricsByNid($nid)
    {
        $query = $this->DB->prepare("SELECT * FROM (SELECT s.source_name, sm.metric_id, sm.metric_name, from_time, sr.source_reference, total_value FROM poi p
                                            JOIN source_reference_poi srp ON srp.poi_id = p.poi_id
                                            JOIN source_reference sr ON sr.source_reference_id = srp.source_reference_id
                                            JOIN source_reference_poi_metric srpm ON srpm.source_reference_poi_id = srp.source_reference_poi_id
                                            JOIN poi_stats_time_aggregated psta ON psta.source_reference_poi_metric_id = srpm.source_reference_poi_metric_id
                                            JOIN source_metric sm ON sm.metric_id = srpm.metric_id
                                            JOIn source s ON s.source_id = sm.source_id
                                            WHERE nid = ?
                                            ORDER BY from_time DESC) a
                                            GROUP BY metric_id");

        $succes = $query->execute(array($nid));
        if (!$succes) {
            die('error');
            return;
        }
        return $query->fetchAll(\PDO::FETCH_OBJ);
    }

    public function updateRecordByPrimaryKey($properties, $values, $identifiers)
    {
        parent::updateRecordByPrimaryKey($properties, $values, $identifiers);
    }
}

?>
