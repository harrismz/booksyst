<?php
session_start();
include ('../../adodb/con_jeinid.php');
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];
try{
    $sql    = "SELECT id, \"status\" FROM RENT_status
                ORDER BY id ASC";
    $rs     = $db_jeinid->Execute($sql);
    $return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['id']	    = trim($rs->fields['0']);
    $return[$i]['status']	= trim($rs->fields['1']);
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