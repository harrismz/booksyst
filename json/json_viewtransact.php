<?php 
session_start();

$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');

$devtype        = isset($_REQUEST['xt_icttype_src']) ? $_REQUEST['xt_icttype_src'] : '';
$devname        = isset($_REQUEST['xt_ictname_src']) ? $_REQUEST['xt_ictname_src'] : '';
$incharge       = isset($_REQUEST['xt_incharge_src']) ? $_REQUEST['xt_incharge_src'] : '';
$xt_date_src    = isset($_REQUEST['xt_date_src']) ? $_REQUEST['xt_date_src'] : date('Y-m-1');
$date	        = substr($xt_date_src,0,10);
$fdate          = date('Y-m-01');

try{
	$query    = "SELECT a.[transaction_id] ,b.[device_name] ,c.[type_name] ,a.[start_date] ,a.[end_date]
                    ,a.[dept] ,a.[incharge] ,a.[purpose] ,a.[remark] ,a.[input_nik] ,a.[input_date]
                FROM RENT_device_trans a
                LEFT JOIN RENT_devices b ON a.device = b.device_id
                LEFT JOIN RENT_device_Types c ON a.device_type = c.device_type_id
                WHERE(a.device_type LIKE '%{$devtype}%'
                OR b.device_id LIKE '%{$devname}%'
                OR a.incharge LIKE '%{$incharge}%')
                AND CONVERT(VARCHAR(10), a.start_date, 120) BETWEEN '{$fdate}' AND EOMONTH(GETDATE())";
	$order  = "ORDER BY a.transaction_id DESC;";
	$rs     = $db_jeinid->Execute($query.' '.$order);
	$return = array();
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id']		    = $rs->fields['0'];
	$return[$i]['name'] 	    = $rs->fields['1'];
	$return[$i]['type']		    = $rs->fields['2'];
	$return[$i]['sdate']	    = substr($rs->fields['3'],0,10);
	$return[$i]['edate']	    = substr($rs->fields['4'],0,10);
	$return[$i]['stime']	    = substr($rs->fields['3'],11,5);
	$return[$i]['etime']	    = substr($rs->fields['4'],11,5);
	$return[$i]['dept']	        = $rs->fields['5'];
	$return[$i]['incharge']	    = $rs->fields['6'];
	$return[$i]['purpose']	    = $rs->fields['7'];
	$return[$i]['remark']	    = $rs->fields['8'];
	$return[$i]['input_nik']	= $rs->fields['9'];
	$return[$i]['input_date']	= $rs->fields['10'];
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
