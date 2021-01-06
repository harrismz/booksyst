<?php
session_start();
echo $booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');

try{
    if($booksyst_userid == 'a.rodi' || $booksyst_userid == 'a.rodi-im'|| $booksyst_userid == 'a.rodi-mecha'|| $booksyst_userid === 'abner-log'|| $booksyst_userid == 'abner-mc' || $booksyst_userid == 'abner-pln' || $booksyst_userid == 'agustinus' || $booksyst_userid == 'idang' || $booksyst_userid == 'indah' || $booksyst_userid == 'indahiqc' || $booksyst_userid == 'torip' || $booksyst_userid == 'morisaka' || $booksyst_userid == 'nakashige' || $booksyst_userid == 'muramatsu' || $booksyst_userid == 'takei' || $booksyst_userid == 'nogamida'){
		//$sql    = "select id_room, roomname, position from RENT_roomdata where dept = 'MEETING' order by position asc";
	echo	$sql    = "SELECT id_room, roomname, position, roomname2 FROM RENT_roomdata WHERE (dept = 'MEETING') OR (dept = 'TRAINING') OR (dept = 'HALL') ORDER BY id_urutan asc";
	}
	else{
		//$sql    = "select id_room, roomname, position from RENT_roomdata where dept = 'MEETING' order by position asc";
	echo	$sql    = "SELECT id_room, roomname, position, roomname2 FROM RENT_roomdata WHERE (dept = 'MEETING' AND room_status = '0') OR (dept = 'TRAINING' AND room_status = '0') OR (dept = 'HALL' AND room_status = '0') ORDER BY id_urutan asc";
	}
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
