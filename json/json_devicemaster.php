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

$devid = isset($_REQUEST['src_mdevtype']) ? $_REQUEST['src_mdevtype'] : '';
$devname = isset($_REQUEST['src_mdevname']) ? $_REQUEST['src_mdevname'] : '';
try{
	$sql    = "SELECT a.device_id, b.type_name, a.device_name, c.status, a.remark
				FROM RENT_devices a
				LEFT JOIN RENT_device_Types b ON a.device_type_id = b.device_type_id
				LEFT JOIN Rent_status c ON a.device_status = c.id
				WHERE a.device_name LIKE '%{$devname}%' AND a.device_type_id LIKE '%{$devid}%'
				ORDER BY a.device_type_id, a.device_id ASC;";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id']		= $rs->fields['0'];
	$return[$i]['type']		= $rs->fields['1'];
	$return[$i]['name'] 	= $rs->fields['2'];
	$return[$i]['status']	= $rs->fields['3'];
	$return[$i]['remark']	= $rs->fields['4'];
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