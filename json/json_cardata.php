<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');
/*where id_car <> 4
and id_car <> 5
and id_car <> 2
and id_car <> 1
and id_car <> 15
and id_car <> 6
and id_car <> 3
and id_car <> 16
and id_car <> 20
and id_car <> 23
and id_car <> 24*/
try{
    $sql    = "select id_car, platno, dept, driver, status from RENT_cardata
				order by status desc";
    $rs     = $db_jeinid->Execute($sql);
    $return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['id_car']	= trim($rs->fields['0']);
    $return[$i]['platno']	= trim($rs->fields['1']);
    $return[$i]['dept']		= trim($rs->fields['2']);
    $return[$i]['driver']	= trim($rs->fields['3']);
    $return[$i]['status']	= trim($rs->fields['4']);
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