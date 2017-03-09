<?php
namespace dataMining2\factory;


require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'netatmo/factory/NetatmoFactory.class.php');

class NetatmoDataMiningFactory extends \dataMining2\factory\DataMiningFactory{
    protected $source_name = 'netatmo';
    
    protected $netatmoFactory;
    
    public function __construct(){
        parent::__construct();
        $this->netAtmoFactory = new \netatmo\factory\NetatmoFactory();
       
    }
    
    protected function getReferencesFromSource($city_id){
        //ONE HARDWARE INSTALLATION PER POI -> manual addition to the system
        return;
    }
    
    /**
     * METRICS
     */
    
    /*overrided function -> allways return poiStat Object */
    protected function getPoiStat($sourceReferencePoiMetric, $metric, $sourceReference) {
        
        $measures = $this->netAtmoFactory->createNetatmo();
        
        $poiStat = new \poi\model\PoiStat();
        $poiStat->source_reference_poi_metric_id = $sourceReferencePoiMetric->source_reference_poi_metric_id;
        $poiStat->timestamp = date('Y-m-d H:i:s');
        
        
        if($metric->metric_name == 'co2') /*co2 seems to have been removed from the API*/ $poiStat->number = 0;
        if($metric->metric_name == 'decibel') $poiStat->number = $measures[0]['modules'][0]['Noise'];
        
        
        return $poiStat;
    }
    
    
    /**
     * ADDITIONAL DATA
     */
    
}
?>
