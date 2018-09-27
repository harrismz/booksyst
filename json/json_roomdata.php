<?php
/*
****	revise by Mohamad Yunus
****	on 20 Dec 2016
****	revise: (line 17) menambahkan userid t_tsubota
*/
	
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');


try{
    $sql	= "exec showroom '".$booksyst_userid ."';";
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