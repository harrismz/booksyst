<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');

$src_date 		= isset($_REQUEST['src_date']) ? $_REQUEST['src_date'] : '';

try{
	if ($src_date != ""){
		$sql    = "SELECT [id_rpa],[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
					WHERE [date] = '$src_date'
					ORDER BY [date] ASC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($src_date == ""){
		$sql    = "SELECT [id_rpa],[date],[start_time],[end_time],[dept],[incharge],[purpose],[remark] FROM [JEINID].[dbo].[RENT_rpa]
					WHERE [date] BETWEEN convert(varchar(10), getdate(), 120) AND (SELECT MAX(convert(varchar(10), DATE, 120)) FROM [JEINID].[dbo].[RENT_rpa])
					ORDER BY [date] ASC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_rpa']	  = $rs->fields['0'];
	$return[$i]['date'] 	  = date_format(date_create($rs->fields['1']), 'Y-m-d');
	$return[$i]['start_time'] = date_format(date_create($rs->fields['2']), 'H:i');
	$return[$i]['end_time']   = date_format(date_create($rs->fields['3']), 'H:i');
	$return[$i]['dept']       = $rs->fields['4'];
	$return[$i]['incharge']   = $rs->fields['5'];
	$return[$i]['purpose']    = $rs->fields['6'];
	$return[$i]['remark']     = $rs->fields['7'];
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