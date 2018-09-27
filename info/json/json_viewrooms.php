<?php
include ('../../../adodb/con_jeinid.php');

$src_roomcode   = isset($_REQUEST['src_roomcode']) ? $_REQUEST['src_roomcode'] : '';
$src_date 		= isset($_REQUEST['src_date']) ? $_REQUEST['src_date'] : '';

/*if ($src_dup_lvdate2 == ""){
    $src_dup_lvdate = $src_dup_lvdate2;
}
else{
    
    $date = date_create($src_dup_lvdate2);
    $src_dup_lvdate = date_format($date,"Y-m-d");
    
}
*/

try{
	if ($src_roomcode != "" && $src_date == ""){
		$sql    = "SELECT [id_rentroom],(SELECT [roomname] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode
					,(SELECT [roomname2] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rooms]
					WHERE (SELECT [id_room] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) = '$src_roomcode'
					ORDER BY [date] asc";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_roomcode == "" && $src_date != ""){
		$sql    = "SELECT [id_rentroom],(SELECT [roomname] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode
					,(SELECT [roomname2] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rooms]
					WHERE [date] = '$src_date'
					ORDER BY [date] asc";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_roomcode != "" && $src_date != ""){
		$sql    = "SELECT [id_rentroom],(SELECT [roomname] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode
					,(SELECT [roomname2] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rooms]
					WHERE (SELECT [id_room] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) = '$src_roomcode'
					AND [date] = '$src_date'
					ORDER BY [date] asc";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($src_roomcode == "" && $src_date == ""){
		$sql    = "SELECT [id_rentroom],(SELECT [roomname] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode
					,(SELECT [roomname2] FROM [JEINID].[dbo].[RENT_roomdata] where [RENT_roomdata].id_room = [RENT_rooms].id_room) as roomcode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rooms] WHERE [date] BETWEEN convert(varchar(10), getdate(), 120) AND (SELECT MAX(convert(varchar(10), DATE, 120)) FROM [JEINID].[dbo].[RENT_rooms])
					ORDER BY [date] ASC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_rentroom']= $rs->fields['0'];
	$return[$i]['roomcode']   = $rs->fields['1'];
	$return[$i]['roomcode2']   = $rs->fields['2'];
	/*$return[$i]['date'] 	  = date_format(date_create($rs->fields['2']), 'd F Y');*/
	$return[$i]['date'] 	  = date_format(date_create($rs->fields['3']), 'Y-m-d');
	$return[$i]['start_time'] = date_format(date_create($rs->fields['4']), 'H:i');
	$return[$i]['end_time']   = date_format(date_create($rs->fields['5']), 'H:i');
	$return[$i]['dept']       = $rs->fields['6'];
	$return[$i]['incharge']   = $rs->fields['7'];
	$return[$i]['purpose']    = $rs->fields['8'];
	$return[$i]['remark']     = $rs->fields['9'];
    $rs->MoveNext();
}

$data = array(
    "success" => true,
    "totalcount" => sizeof($return),
    "data" => $return
);

echo json_encode($data);

$db_jeinid->Close();
$db_jeinid=null;
?>