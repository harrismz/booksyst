<?php
include ('../../../adodb/con_jeinid.php');

try{
    $sql    = "select id_car, platno, dept, driver, status from RENT_cardata order by dept asc";
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