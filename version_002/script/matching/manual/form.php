<script src="../js/jquery-1.8.3.min.js"></script>

<script>
    $(document).ready(function(){
        
        var type = $("select[name='type']").val();
        
        $("input[name='apen_title']").change(function(){
            $('.apen_title_msg').text('checking ...');
            getApenPoi($("input[name='apen_title']").val(),'title');
        });
        
        $("input[name='apen_nid']").change(function(){
            $('.apen_nid_msg').text('checking ...');
            getApenPoi($("input[name='apen_nid']").val(),'nid');
        });
        
        $("input[name='source_slug']").change(function(){
            
        });
        
        $("input[name='type']").change(function(){
            /*TODO: if type changed, recheck source slug*/
        });
        
        
        function getApenPoi(value, valueType){
            var jsonData = {};
            jsonData[valueType] = value;
            var request = $.ajax({url: "ajax.php",
                                  type: "POST",
                                  async: true,
                                  dataType: 'json',
                                  data: jsonData
                                 });
            request.done(function(data){fillByResponse(data, valueType);});
            request.fail(function(){ alert('action failed. Contact admin.'); });
        }
        
        
        function fillByResponse(data,valueType){
            if(valueType == 'title' && data.poi_id != null){
                $('.apen_title_msg').text('match found');
                $("input[name='apen_nid']").val(data.nid);
                $('#manual-match-form #status').text('checking ...');
                getStatus(data);
            }else if(valueType == 'title' && data.poi_id == null){
                 $('.apen_title_msg').text('no match found');
            }
            
            if(valueType == 'nid' && data.poi_id != null){
                $('.apen_nid_msg').text('match found');
                $("input[name='apen_title']").val(data.name);
                $('#manual-match-form #status').text('checking ...');
                getStatus(data);
            }else if(valueType == 'nid' && data.poi_id == null){
                 $('.apen_nid_msg').text('no match found');
            }
        }
        
        
        
        function getStatus(data){
             var request = $.ajax({url: "ajax.php",
                                  type: "POST",
                                  async: true,
                                  dataType: 'json',
                                  data: {refByPoiId: data.poi_id, source:type}
                                 });
            request.done(function(data){$('#manual-match-form #status').text(data.source_reference_poi_id)});
            request.fail(function(){ alert('action failed. Contact admin.'); });
        }
        
    });
</script>


<form id='manual-match-form' method='post' action=''>
    <table>
        <tr>
            <td> <label for='apen_title'>apen title:</label> </td>
            <td> <input type='text' name='apen_title' value='' /> </td>
            <td class="apen_title_msg"></td>
        </tr>
        <tr>
            <td style='line-height:2px;'> or </td>
        </tr>
        <tr>
            <td> <label for='apen_nid'>apen nid:</label> </td>
            <td> <input type='text' name='apen_nid' value='' size='5'/> </td>
            <td class="apen_nid_msg"></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td> <label for='source_slug'>source slug/reference:</label> </td>
            <td> <input type='text' name='source_slug' value='' /> </td>
            <td class="source_slug_msg"></td>
        </tr>
        <tr>
            <td> <label for='type'>type:</label> </td>
            <td> <select name='type' disabled='disabled'> 
            <option value='facebook' selected="true">Facebook</option>
            <option value='facebook'>Twitter</option>
            <option value='facebook'>Foursquare</option>
            <option value='facebook'>Instagram</option>
          </select> </td>
        </tr>
        <tr>
            <td>status:</td>
            <td id='status'></td>
        </tr>
        <tr>
            <td colspan="2"><input type='submit' value='connect' name='connect' disabled style='width:100%;'/></td>
        </tr>
    </table>
    <?php
        echo '';
    ?>
</form>
