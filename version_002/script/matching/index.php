<?php
    require_once('../../source/service/SourceReferencePoiMatchService.class.php');
    require_once('../../antwerp/grid/libs/gps_class.php');
    
    $matchingService = new \source\service\SourceReferencePoiMatchService();
    
    if(isset($_GET['match'])){
        $values = explode('-', $_GET['match']);
        if(count($values) == 2){
            $matchingService->markAsMatch($values[0], $values[1]);
        }
    }
    
    if(isset($_GET['unMatch'])){
        $values = explode('-', $_GET['unMatch']);
        if(count($values) == 2){
            $matchingService->markAsNoMatch($values[0], $values[1]);
        }
    }
    
    $sid = (isset($_GET['sid']) && is_numeric($_GET['sid'])) ? $_GET['sid'] : 2;
    
    $show = (isset($_GET['show']) && ($_GET['show'] == 'idle' || $_GET['show'] == 'all')) ? $_GET['show'] : 'all';
    $includeCheckedMatches = ($show == 'all') ? true : false;
    $matchCandidates = $matchingService->getMatches($sid,$includeCheckedMatches);
    
    $sourceUrl = '';
    
    switch($sid){
        case '1': $sourceUrl = 'http://facebook.com/'; break;
        case '2': $sourceUrl = 'https://foursquare.com/venue/'; break;
        case '4': $sourceUrl = 'https://twitter.com/'; break;
        case '6': $sourceUrl = 'http://web.stagram.com/location/'; break;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>dashboard reference matching</title>
        
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
        <script src="js/jquery-1.8.3.min.js"></script>
        <script src="js/scripts.js"></script>
        <script src="js/jquery.tablesorter.min.js"></script>
        <script src="js/jquery.metadata.js"></script>
        
        <script>
            $(document).ready(function(){
                
                $('.match-grid').tablesorter();
                
                filter = '<?php echo $show; ?>';
                
                $('a.action-match').click(function(){
                   var values   = $(this).attr('id').split('-');
                   var status   = ajaxCall('match', values[0], values[1]);
                   
                   if(status){
                       $(this).parent().parent().find(".status").text('1');
                       if(filter == 'idle')
                           $(this).parent().parent().hide('fast', function(){$(this).remove();});
                   }
                   
                   return false;
                });
                
                $('a.action-nomatch').click(function(){
                   var values   = $(this).attr('id').split('-');
                   var status   = ajaxCall('unmatch', values[0], values[1]);
                   //alert(status);
                   if(status){
                       $(this).parent().parent().find(".status").text('0');
                       if(filter == 'idle')
                           $(this).parent().parent().hide('fast', function(){$(this).remove();});
                   }
                   
                   return false;
                });
                
                function ajaxCall(action, sourceReferenceId, poiId){
                    var succeeded = false;
                    
                    var request = $.ajax({url: "ajax.php",
                                          type: "POST",
                                          async: false,
                                          dataType: 'json',
                                          data: {action: action, sourceReferenceId: sourceReferenceId, poiId: poiId}
                                         });
                    request.done(function(){ succeeded = true;});
                    request.fail(function(){ alert('action failed. Contact admin.'); });
                    
                    return succeeded;
                }
                
            });
        </script>

    </head>
    <body>
        
        
        <h1 id="h1-title">Dashboard reference matching</h1>
        
        <div class='header-form'>
            <form id='frm-filter' action='' method='get'>
                all <input type='radio' name='show' value='all' <?php if($show == 'all') echo 'checked'; ?> /> unchecked <input type='radio' name='show' value='idle' <?php if($show == 'idle') echo 'checked'; ?> />
                <input type='submit' value='filter' name='submit' />
            </form>
        </div>
        <div class='clearfix'></div>
        
        <span>Records: <?php echo count($matchCandidates); ?></span>
        
        <div class='table-container'>
            <table class='match-grid' cellspacing="0px">
                <thead>
                    <tr>
                        <th></th>
                        <th>source</th>
                        <th>source reference</th>
                        <th>source address</th>
                        <th>apen reference</th>
                        <th>apen address</th>
                        <th class="headerSortUp">geo match&nbsp;&nbsp;</th>
                        <th class="{sorter: 'digit'}">distance&nbsp;</th>
                        <th>name match</th>
                        <th class="headerSortUp">score&nbsp;&nbsp;</th>
                        <th>match</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $i = 1;
                        foreach($matchCandidates as $matchCandidate){
                            //var_dump($matchCandidate); die();
                            $geoMatch = ($matchCandidate->type & 1) ? 'yes' : 'no';
                            $nameMatch = ($matchCandidate->type & 2) ? 'yes' : 'no';

                            if($matchCandidate->type & 2)
                            $nameMatchInd = '<div class="indicator" style="width:'.($matchCandidate->score - 50) * 0.5.'%;"></div>';
                            else
                            $nameMatchInd = $nameMatch;

                            $distance = new \antwerp\grid\libs\CalcMiles($matchCandidate->s_lat, $matchCandidate->s_lon, $matchCandidate->latitude, $matchCandidate->longitude, 'meter');
                            $distance = round($distance->lastResult,2);

                            $rowClass = ($matchCandidate->type == 3 && $matchCandidate->score >= 95) ? 'suggest' : '';

                            echo '<tr class="'.$rowClass.'">';
                                echo '<td>'.$i.'</td>';
                                echo '<td>'. $matchCandidate->source_id .'</td>';
                                echo '<td><a href="'.$sourceUrl.$matchCandidate->source_reference.'" target="_blank">'. $matchCandidate->reference_name .'</a></td>';
                                echo '<td>'. '' /*$matchCandidate->s_lat .', '. $matchCandidate->s_lon*/ .'</td>';
                                echo '<td><a href="http://apen.be/node/'.$matchCandidate->nid.'" target="_blank">'. $matchCandidate->name .'</a></td>';
                                echo '<td>'. ''/*$matchCandidate->latitude .', '. $matchCandidate->longitude*/ .'</td>';
                                echo '<td class="'.$geoMatch.'">'. $geoMatch .'</td>';
                                echo '<td>'.$distance.'&nbsp;m</td>';
                                echo '<td class="'.$nameMatch.'">'. $nameMatchInd .'</td>';
                                echo '<td>'. $matchCandidate->score .'</td>';
                                echo '<td class="status">'. $matchCandidate->is_match .'</td>';
                                echo '<td><a href="?show='.$show.'&match='.$matchCandidate->source_reference_id.'-'.$matchCandidate->poi_id.'" id="'.$matchCandidate->source_reference_id.'-'.$matchCandidate->poi_id.'" class="yes action-match">match</a> 
                                          <a href="?show='.$show.'&unMatch='.$matchCandidate->source_reference_id.'-'.$matchCandidate->poi_id.'" id="'.$matchCandidate->source_reference_id.'-'.$matchCandidate->poi_id.'" class="no action-nomatch">no&nbsp;match</a></td>';
                            echo '</tr>';

                            $i++;
                        }
                    ?>
                </tbody>
            </table>
        </div>
        
    </body>
</html>
