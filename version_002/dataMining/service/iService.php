<?php
interface iService{

	/*Look for references relevant to given city*/
	public function getRelevantReferences($city_id);

	/*get metric data by sourceReferenceId or from range of sourceReferenceIds*/
	public function getMetricsBySourceReferenceId($sourceReferenceId, $toSourceReferenceId);
        
        
}
?>
