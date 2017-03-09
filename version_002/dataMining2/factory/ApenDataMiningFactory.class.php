<?php
namespace dataMining2\factory;

require_once (ROOT . 'poi/factory/PoiCityFactory.class.php');
require_once (ROOT . 'dataMining2/factory/DataMiningFactory.class.php');
require_once (ROOT . 'source/model/SourceReference.class.php');
require_once (ROOT . 'apen/factory/ApenLocatedNodeFactory.class.php');

class ApenDataMiningFactory extends \dataMining2\factory\DataMiningFactory {
    
    protected $source_name = 'apen';
    protected $apenFactory;
    protected $sourceCityGeolocationLimit = 10;
    
    public function __construct() {
        parent::__construct();
        $this->apenFactory = new \apen\factory\ApenLocatedNodeFactory();
    } 
    
    protected function getReferencesFromSource($city_id)
    {
        //get city by id
        $cityFactory = new \poi\factory\PoiCityFactory();
        $city = $cityFactory->getPoiCityById($city_id);
        
       //in facebook's case, we get our references by geolocation
        $references = $this->createReferencesFromApen();
        return $references;
    }
    
   /**
    * METRICS
    */

    /*overrided function -> allways return poiStat Object */
    protected function extractPoiStatsFromMetrics($metrics) {
        //only 1 API call
        $apenDailyCount = $this->apenFactory->getApenDailyCount($metrics[0]['source_reference']);
       
        $poiStats = Array();
        foreach($metrics as $metric){
            $poiStat = new \poi\model\PoiStat();
            $poiStat->source_reference_poi_metric_id = $metric['source_reference_poi_metric_id'];
            $poiStat->timestamp = date('Y-m-d H:i:s');
            //you need to know the metrics
            if($metric['metric_name'] == 'visit') $poiStat->number = (isset($apenDailyCount->totalcount)) ? $apenDailyCount->totalcount : 0;
           
            $poiStats[] = $poiStat;
        }
        
        return $poiStats;
    }
    
    protected function convertReference($reference){
        $sourceReference = new \source\model\SourceReference();
        $sourceReference->source_reference  = $reference->nid;
        $sourceReference->reference_name    = $reference->title;
        $sourceReference->source_id         = $this->source_id;
        $sourceReference->latitude          = $reference->latitude;
        $sourceReference->longitude         = $reference->longitude;

        return $sourceReference;
    }
    
    private function createReferencesFromApen(){
        return $this->apenFactory->getTrendingPlaces();
    }
    
}

?>
