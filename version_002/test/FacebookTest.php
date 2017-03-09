<?php
    require_once('../facebook/factory/FacebookFactory.class.php');
    $factory = new \facebook\factory\FacebookFactory();
    
    //$sourceReferences = $factory->getLinkedSourceReferences();
    $sourceReferences = $factory->getLinkedSourceReferencesByRange(1,10);
    //$sourceMetrics = $factory->getSourceMetrics();
    
    echo '<pre>';
    $factory->createPoisAndSourceReferencesFromApenNodes();
    //var_dump($sourceReferences);
    //var_dump($sourceMetrics);
    echo '</pre>';
?>
