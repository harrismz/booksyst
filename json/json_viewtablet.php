<?php
session_start();
include ('../../adodb/con_jeinid.php');

$src_tabletcode= @$_REQUEST['src_tabletcode'];
$src_date 	= @$_REQUEST['src_date'];
$page		= @$_REQUEST["page"];
$limit		= @$_REQUEST["limit"];
$start		= (($page*$limit)-$limit)+1;



try{
	if ($src_tabletcode != "" && $src_date == ""){
			$sql    = "	SELECT [id_rent],
						(	SELECT [tabletname] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode
						,(	SELECT [tabletname2] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode2
						,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] 
						FROM [JEINID].[dbo].[RENT_tablet]
						WHERE (	SELECT [id_tablet] 
								FROM [JEINID].[dbo].[RENT_tabletdata] 
								where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
							) = '$src_tabletcode'
						ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_tabletcode == "" && $src_date != ""){
			$sql    = "	SELECT [id_renttablet],
						(	SELECT [tabletname] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode
						,(	SELECT [tabletname2] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode2
						,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] 
						FROM [JEINID].[dbo].[RENT_tablet]
					WHERE [date] = '$src_date'
					ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif ($src_tabletcode != "" && $src_date != ""){
			$sql    = "	SELECT [id_renttablet],
						(	SELECT [tabletname] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode
						,(	SELECT [tabletname2] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode2
						,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] 
						FROM [JEINID].[dbo].[RENT_tablet]
						WHERE (	SELECT [id_tablet] 
								FROM [JEINID].[dbo].[RENT_tabletdata] 
								where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
							) = '$src_tabletcode'
						AND [date] = '$src_date'
						ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($src_tabletcode == "" && $src_date == ""){
			$sql    = "	SELECT [id_renttablet],
						(	SELECT [tabletname] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode
						,(	SELECT [tabletname2] 
							FROM [JEINID].[dbo].[RENT_tabletdata] 
							where [RENT_tabletdata].id_tablet = [RENT_tablet].id_tablet
						) as tabletcode2
						,[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] 
						FROM [JEINID].[dbo].[RENT_tablet]
						ORDER BY [date] DESC, [end_time] DESC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_renttablet']= $rs->fields['0'];
	$return[$i]['tabletcode']   = $rs->fields['1'];
	$return[$i]['tabletcode2']   = $rs->fields['2'];
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