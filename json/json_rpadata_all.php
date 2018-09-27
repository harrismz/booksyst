<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');


try{
	//$sql    = "select id_rpa, rpaname, position from RENT_rpadata where dept = 'MEETING' order by position asc";
	$sql    = "SELECT id_rpa, rpaname, position, rpaname2 FROM RENT_rpadata WHERE (dept = 'RPA') ORDER BY id_urutan asc";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['id_rpa']  = trim($rs->fields['0']);
    $return[$i]['rpaname']	= trim($rs->fields['1']);
    $return[$i]['position']	= trim($rs->fields['2']);
    $return[$i]['rpaname2']= trim($rs->fields['3']);
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