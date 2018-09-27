<?php
include ('../../../adodb/con_jeinid.php');
try{
	$sql    = "SELECT [id_car],[platno],[dept],[driver],[driver_call],[carname] FROM [JEINID].[dbo].[RENT_cardata] order by [platno] asc";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_car']     = $rs->fields['0'];
	$return[$i]['platno']     = $rs->fields['1'];
	$return[$i]['dept']       = $rs->fields['2'];
	$return[$i]['driver']     = $rs->fields['3'];
	$return[$i]['driver_call']= $rs->fields['4'];
	$return[$i]['carname']    = $rs->fields['5'];
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