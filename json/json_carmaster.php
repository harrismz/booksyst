<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];
include ('../../adodb/con_jeinid.php');
/*where id_car <> 4
and id_car <> 5
and id_car <> 6
and id_car <> 3
and id_car <> 2
and id_car <> 1
and id_car <> 15
and id_car <> 16
and id_car <> 20
and id_car <> 23
and id_car <> 24*/
try{
	$sql    = "SELECT [id_car],[platno],[dept],[driver],[driver_call],[carname], [status]
				FROM [JEINID].[dbo].[RENT_cardata]
				order by [platno] asc";
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
	$return[$i]['status']    = $rs->fields['6'];
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