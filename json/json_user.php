<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');


try{
	$sql    = "SELECT *
				FROM UserTbl 
				where UserType not like '000%'
				and UserType not like '007%'
				and UserType not like '010%'
				and UserType not like '020%'
				and UserType not like '100%'
				and UserType not like '210%'
				and UserType not like '300%'
				ORDER BY userid asc";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['userid']  = trim($rs->fields['0']);
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