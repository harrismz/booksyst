<?php
session_start();
$booksyst_userid    = $_SESSION['booksyst_userid'];
$booksyst_usertype  = $_SESSION['booksyst_usertype'];
$booksyst_userdept  = $_SESSION['booksyst_userdept'];

include ('../../adodb/con_jeinid.php');

$xt_car_src     = isset($_REQUEST['src_car']) ? $_REQUEST['src_car'] : '';
$xt_date_src1   = isset($_REQUEST['src_date']) ? $_REQUEST['src_date'] : '';
$xt_date_src	= substr($xt_date_src1,0,10);
$xt_incharge_src= isset($_REQUEST['src_incharge']) ? $_REQUEST['src_incharge'] : '';

try{
	if(($xt_car_src != "" || $xt_incharge_src != "") && $xt_date_src ==""){
		$sql    = "SELECT [id_rentcar]
					,(SELECT [platno] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as platno
					,(SELECT [dept] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as dept_car
					,(SELECT [driver] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver
					,(SELECT [driver_call] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver_call
					,[dept],[incharge],[start_date],[end_date],[destination],[purpose],[remark]
					FROM [JEINID].[dbo].[RENT_cars]
					where  (SELECT [id_car] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car = [RENT_cars].id_car) like '%$xt_car_src%'
					and [incharge] like '%$xt_incharge_src%' order by [start_date] desc";
				/*where  id_car <> 4 and id_car <> 3 and id_car <> 6 and id_car <> 5 and id_car <> 2 and id_car <> 1 and id_car <> 15 and id_car <> 16
					and id_car <> 20 and id_car <> 23 and id_car <> 24*/
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($xt_car_src == "" && $xt_incharge_src == "" && $xt_date_src !=""){
		$sql    = "SELECT [id_rentcar]
					,(SELECT [platno] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as platno
					,(SELECT [dept] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as dept_car
					,(SELECT [driver] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver
					,(SELECT [driver_call] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver_call
					,[dept],[incharge],[start_date],[end_date],[destination],[purpose],[remark]
					FROM [JEINID].[dbo].[RENT_cars]
					where datediff(day, [start_date], '$xt_date_src') = 0 or datediff(day, [end_date], '$xt_date_src') = 0 order by [start_date] desc";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif(($xt_car_src != "" || $xt_incharge_src != "") && $xt_date_src !=""){
		$sql    = "SELECT [id_rentcar]
					,(SELECT [platno] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as platno
					,(SELECT [dept] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as dept_car
					,(SELECT [driver] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver
					,(SELECT [driver_call] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver_call
					,[dept],[incharge],[start_date],[end_date],[destination],[purpose],[remark]
					FROM [JEINID].[dbo].[RENT_cars]
					where (datediff(day, [start_date], '$xt_date_src') = 0 or datediff(day, [end_date], '$xt_date_src') = 0)
					and (SELECT [id_car] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car = [RENT_cars].id_car) like '%$xt_car_src%'
					and [incharge] like '%$xt_incharge_src%' order by [start_date] desc";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
	elseif($xt_car_src == "" && $xt_incharge_src == "" && $xt_date_src ==""){
		$sql    = "SELECT [id_rentcar]
					,(SELECT [platno] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as platno
					,(SELECT [dept] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as dept_car
					,(SELECT [driver] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver
					,(SELECT [driver_call] FROM [JEINID].[dbo].[RENT_cardata] where [RENT_cardata].id_car= [RENT_cars].id_car) as driver_call
					,[dept],[incharge],[start_date],[end_date],[destination],[purpose],[remark]
					FROM [JEINID].[dbo].[RENT_cars]
					where [start_date] BETWEEN convert(varchar(10), getdate(), 120) AND DATEADD(day,1,(SELECT MAX(convert(varchar(10), [END_DATE], 120)) FROM [JEINID].[dbo].[RENT_cars]))
					order by [start_date] ASC";
		$rs     = $db_jeinid->Execute($sql);
		$return = array();
	}
}
catch (Exception $ex){
    echo '[[[MYSQL]]] :::'.$ex->getMessage();
}

for($i=0; !$rs->EOF; $i++){
	$return[$i]['id_rentcar'] = $rs->fields['0'];
	$return[$i]['platno']     = $rs->fields['1'];
	$return[$i]['dept_car']   = $rs->fields['2'];
	$return[$i]['driver']     = $rs->fields['3'];
	$return[$i]['driver_call']= $rs->fields['4'];
	$return[$i]['dept']       = $rs->fields['5'];
	$return[$i]['incharge']   = $rs->fields['6'];
	/*$return[$i]['start_date'] = date_format(date_create($rs->fields['7']), 'd F Y');
	$return[$i]['start_time'] = date_format(date_create($rs->fields['7']), 'H:i');
	$return[$i]['end_date']   = date_format(date_create($rs->fields['8']), 'd F Y');
	$return[$i]['end_time']   = date_format(date_create($rs->fields['8']), 'H:i');*/
	$return[$i]['start_date'] = date_format(date_create($rs->fields['7']), 'Y-m-d');
	$return[$i]['start_time'] = date_format(date_create($rs->fields['7']), 'H:i');
	$return[$i]['end_date']   = date_format(date_create($rs->fields['8']), 'Y-m-d');
	$return[$i]['end_time']   = date_format(date_create($rs->fields['8']), 'H:i');
	$return[$i]['destination']= $rs->fields['9'];
	$return[$i]['purpose']    = $rs->fields['10'];
	$return[$i]['remark']     = $rs->fields['11'];
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