<?php
session_start();
include ('../../adodb/con_jeinid.php');

$src_rpacode= @$_REQUEST['src_rpacode'];
$src_date 	= @$_REQUEST['src_date'];
$page		= @$_REQUEST["page"];
$limit		= @$_REQUEST["limit"];
$start		= (($page*$limit)-$limit)+1;



try{
	if ($src_rpacode != "" && $src_date == ""){
			$sql    = "SELECT [id_rentrpa],(SELECT [rpaname] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode
						,(SELECT [rpaname2] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode2
						,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
						WHERE (SELECT [id_rpa] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) = '$src_rpacode'
						ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_rpacode == "" && $src_date != ""){
		$sql    = "SELECT [id_rentrpa],(SELECT [rpaname] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode
					,(SELE CT [rpaname2] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
					WHERE [date] = '$src_date'
					ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_rpacode != "" && $src_date != ""){
		$sql    = "SELECT [id_rentrpa],(SELECT [rpaname] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode
					,(SELECT [rpaname2] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
					WHERE (SELECT [id_rpa] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) = '$src_rpacode'
					AND [date] = '$src_date'
					ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($src_rpacode == "" && $src_date == ""){
		$sql    = "SELECT [id_rentrpa],(SELECT [rpaname] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode
					,(SELECT [rpaname2] FROM [JEINID].[dbo].[RENT_rpadata] where [RENT_rpadata].id_rpa = [RENT_rpa].id_rpa) as rpacode2
					,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
					-- WHERE [date] BETWEEN convert(varchar(10), getdate(), 120) AND (SELECT MAX(convert(varchar(10), DATE, 120)) FROM [JEINID].[dbo].[RENT_rpa])
					ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_rentrpa']= $rs->fields['0'];
	$return[$i]['rpacode']   = $rs->fields['1'];
	$return[$i]['rpacode2']   = $rs->fields['2'];
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