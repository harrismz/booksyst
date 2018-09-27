<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];
include ('../../adodb/con_jeinid.php');
$id_rentroom = isset($_REQUEST['id_rentroom']) ? $_REQUEST['id_rentroom'] : "";
try{
	$sql    = "SELECT [dept_member],[username] FROM [JEINID].[dbo].[RENT_roomuser] WHERE id_rentroom = '$id_rentroom' order by [username] asc";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['dept_member']= $rs->fields['0'];
	$return[$i]['username']= $rs->fields['1'];
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