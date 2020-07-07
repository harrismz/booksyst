<?php
session_start();
include ('../../adodb/con_jeinid.php');
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];
$typeid = isset($_REQUEST['typeid']) ? $_REQUEST['typeid'] : '';
try{
    $sql    = "SELECT device_id, device_name FROM RENT_devices
                WHERE device_type_id = $typeid AND device_status = 1
                ORDER BY device_id ASC";
    $rs     = $db_jeinid->Execute($sql);
    $return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['id']	= trim($rs->fields['0']);
    $return[$i]['name']	= trim($rs->fields['1']);
    $rs->MoveNext();
}

$data = array(
    "success" => true,
    "data" => $return
);
echo json_encode($data);

$db_jeinid->Close();
$db_jeinid=null;
?>