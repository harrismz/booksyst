<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');


try{
	//$sql    = "select id_room, roomname, position from RENT_roomdata where dept = 'MEETING' order by position asc";
	$sql    = "SELECT id_room, roomname, position, roomname2 FROM RENT_roomdata WHERE (dept = 'MEETING') OR (dept = 'TRAINING') OR (dept = 'HALL')  
				and id_room <> '11' 
				ORDER BY id_urutan asc";
	$rs     = $db_jeinid->Execute($sql);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
    $return[$i]['id_room']  = trim($rs->fields['0']);
    $return[$i]['roomname']	= trim($rs->fields['1']);
    $return[$i]['position']	= trim($rs->fields['2']);
    $return[$i]['roomname2']= trim($rs->fields['3']);
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