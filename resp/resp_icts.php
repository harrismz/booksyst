<?php
	session_start();
	include "../../adodb/con_jeinid.php";
	
	$var_msg		= "";
	$datenow  		= "convert(varchar(20), getdate(), 120)";
	$booksyst_userid= isset($_SESSION['booksyst_userid']) ? $_SESSION['booksyst_userid'] : '';
	$xt_type		= isset($_REQUEST['xt_type']) ? $_REQUEST['xt_type'] : '';
	
	if(($booksyst_userid == null) || ($booksyst_userid == "")){
		echo "{
			'success': false,
			'msg' : 'Your access time is up, Please login again. ( Click menu BACK TO JEINWEB )'
		}";
	} 
	else{
		if($xt_type == "register"){
			$xt_icttype  	= isset($_REQUEST['xt_icttype']) ? $_REQUEST['xt_icttype'] : '';
			$xt_ict  	 	= isset($_REQUEST['xt_ict']) ? $_REQUEST['xt_ict'] : '';
			$xt_dept     	= isset($_REQUEST['xt_dept']) ? $_REQUEST['xt_dept'] : '';
			$xt_incharge 	= isset($_REQUEST['xt_incharge']) ? $_REQUEST['xt_incharge'] : '';
			$xt_startdate	= isset($_REQUEST['xt_startdate']) ? $_REQUEST['xt_startdate'] : '';
			$xt_starttime	= isset($_REQUEST['xt_starttime']) ? $_REQUEST['xt_starttime'] : '';
			$xt_enddate  	= isset($_REQUEST['xt_enddate']) ? $_REQUEST['xt_enddate'] : '';
			$xt_endtime  	= isset($_REQUEST['xt_endtime']) ? $_REQUEST['xt_endtime'] : '';
			$startdatetime 	= $xt_startdate." ".$xt_starttime.".000";
			$enddatetime 	= $xt_enddate." ".$xt_endtime.".000";
			$xt_purpose   	= isset($_REQUEST['xt_purpose']) ? $_REQUEST['xt_purpose'] : '';
			$xt_remark   	= isset($_REQUEST['xt_remark']) ? $_REQUEST['xt_remark'] : '';
			
			try{
				$sql_check 		= "SELECT COUNT(*) FROM RENT_device_trans WHERE start_date < '{$enddatetime}' and end_date > '{$startdatetime}' and device = '{$xt_ict}'";
				$rs_check 		= $db_jeinid->Execute($sql_check);
				$exists_check 	= $rs_check->fields[0];
				$rs_check->Close();
				
				if($exists_check == 0){
					try{
						$sql = "INSERT INTO RENT_device_trans (device, device_type, start_date, end_date, dept, incharge, purpose, remark, input_nik, input_date)
								VALUES ('$xt_ict','$xt_icttype','$startdatetime','$enddatetime','$xt_dept','$xt_incharge','$xt_purpose','$xt_remark','$booksyst_userid',$datenow)";
						$rs = $db_jeinid->Execute($sql);

						$var_msg = 1;
					}
					catch (exception $e){
						$var_msg = $db_jeinid->ErrorNo();
					}
				}
				else{
					$var_msg = 9;
				}
			}catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		
		elseif($xt_type == "update"){
			$xt_id_upd      	= isset($_REQUEST['xt_id_upd']) ? $_REQUEST['xt_id_upd'] : '';
			$xt_icttype_upd		= isset($_REQUEST['xt_icttype_upd']) ? $_REQUEST['xt_icttype_upd'] : '';
			$xt_ict_upd     	= isset($_REQUEST['xt_ict_upd']) ? $_REQUEST['xt_ict_upd'] : '';
			$xt_dept_upd     	= isset($_REQUEST['xt_dept_upd']) ? $_REQUEST['xt_dept_upd'] : '';
			$xt_incharge_upd 	= isset($_REQUEST['xt_incharge_upd']) ? $_REQUEST['xt_incharge_upd'] : '';
			$xt_startdate_upd	= isset($_REQUEST['xt_startdate_upd']) ? $_REQUEST['xt_startdate_upd'] : '';
			$xt_starttime_upd	= isset($_REQUEST['xt_starttime_upd']) ? $_REQUEST['xt_starttime_upd'] : '';
			$xt_enddate_upd  	= isset($_REQUEST['xt_enddate_upd']) ? $_REQUEST['xt_enddate_upd'] : '';
			$xt_endtime_upd  	= isset($_REQUEST['xt_endtime_upd']) ? $_REQUEST['xt_endtime_upd'] : '';
			$startdatetime_upd	= $xt_startdate_upd." ".$xt_starttime_upd.".000";
			$enddatetime_upd	= $xt_enddate_upd." ".$xt_endtime_upd.".000";
			$xt_purpose_upd 	= isset($_REQUEST['xt_purpose_upd']) ? $_REQUEST['xt_purpose_upd'] : '';
			$xt_remark_upd  	= isset($_REQUEST['xt_remark_upd']) ? $_REQUEST['xt_remark_upd'] : '';
			
			
			try{
				$sql_check = "SELECT * FROM RENT_device_trans WHERE start_date < '{$enddatetime_upd}' AND end_date > '{$startdatetime_upd}' 
									AND device = '{$xt_ict_upd}' AND transaction_id <> '{$xt_id_upd}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				$rs_check->Close();
				
				
				if($exists_check == 0){
					try{
						$sql = "UPDATE RENT_device_trans SET device = '{$xt_ict_upd}', device_type = '{$xt_icttype_upd}', dept = '{$xt_dept_upd}', incharge = '{$xt_incharge_upd}',
								start_date = '{$startdatetime_upd}', end_date = '{$enddatetime_upd}', purpose = '{$xt_purpose_upd}', remark = '{$xt_remark_upd}'
								, update_nik = '{$booksyst_userid}', update_date = $datenow
								WHERE transaction_id = '{$xt_id_upd}'";
						$rs = $db_jeinid->Execute($sql);

						$var_msg = 8;
					}
					catch (exception $e){
						$var_msg = $db_jeinid->ErrorNo();
					}
				}
				else{
					$var_msg = 10;
				}
				
			}catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		
		elseif($xt_type == "cancel"){
			$xt_id = isset($_REQUEST['xt_id_del']) ? $_REQUEST['xt_id_del'] : "";
			try{
				$sql = "DELETE FROM RENT_device_trans WHERE transaction_id = '$xt_id';";
				$rs = $db_jeinid->Execute($sql);
				$var_msg = 2;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "adddevtype"){
			$xt_devtype = isset($_REQUEST['xt_devtype']) ? $_REQUEST['xt_devtype'] : "";
			try{
				$query_insert = "INSERT INTO RENT_device_Types (type_name) VALUES ('$xt_devtype')";
				$rs = $db_jeinid->Execute($query_insert);
				$var_msg = 3;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}		
		elseif($xt_type == "upddevtype"){
			$xt_iddevtype_upd = isset($_REQUEST['xt_iddevtype_upd']) ? $_REQUEST['xt_iddevtype_upd'] : "";
			$xt_devtype_upd = isset($_REQUEST['xt_devtype_upd']) ? $_REQUEST['xt_devtype_upd'] : "";

			// echo '<br>'.$xt_iddevtype_upd.'<br>'.$xt_devtype_upd;
			try{
				$sql_update = "UPDATE RENT_device_Types SET type_name = '{$xt_devtype_upd}' WHERE device_type_id = '{$xt_iddevtype_upd}'";
				$rs = $db_jeinid->Execute($sql_update);
				$var_msg = 4;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "addmaster"){
			$xt_device		 	= isset($_REQUEST['xt_device']) ? $_REQUEST['xt_device'] : "";
			$xt_devicetype 		= isset($_REQUEST['xt_devicetype']) ? $_REQUEST['xt_devicetype'] : "";
			$xt_status 			= isset($_REQUEST['xt_status']) ? $_REQUEST['xt_status'] : "";
			$xt_masterremark 	= isset($_REQUEST['xt_masterremark']) ? $_REQUEST['xt_masterremark'] : "";
			try{
				$sql_insert = "INSERT INTO RENT_devices (device_type_id, device_name, device_status, remark, input_nik, input_date)
								VALUES ('$xt_devicetype','$xt_device','$xt_status','$xt_masterremark','$booksyst_userid',GETDATE())";
				$rs = $db_jeinid->Execute($sql_insert);
				$var_msg = 5;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "updmaster"){
			$xt_idict_upd = isset($_REQUEST['xt_idict_upd']) ? $_REQUEST['xt_idict_upd'] : "";
			$xt_device_upd = isset($_REQUEST['xt_device_upd']) ? $_REQUEST['xt_device_upd'] : "";
			$xt_devicetype_upd = isset($_REQUEST['xt_devicetype_upd']) ? $_REQUEST['xt_devicetype_upd'] : "";
			$xt_status_upd = isset($_REQUEST['xt_status_upd']) ? $_REQUEST['xt_status_upd'] : "";
			$xt_masterremark_upd = isset($_REQUEST['xt_masterremark_upd']) ? $_REQUEST['xt_masterremark_upd'] : "";
			try{
				$sql_update = "UPDATE RENT_devices SET device_name = '{$xt_device_upd}', device_type_id = '{$xt_devicetype_upd}', device_status = '{$xt_status_upd}', 
						 remark = '{$xt_masterremark_upd}', update_nik = '{$booksyst_userid}', update_date = GETDATE() WHERE device_id = '{$xt_idict_upd}'";
				$rs2 = $db_jeinid->Execute($sql_update);

				$var_msg = 7;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		/*
		elseif($xt_type == "delmaster"){
			$xt_idcar = isset($_REQUEST['xt_idcar']) ? $_REQUEST['xt_idcar'] : "";
			try{
				$sql2 = "DELETE FROM RENT_cardata WHERE id_car = '$xt_idcar'";
				$rs2 = $db_jeinid->Execute($sql2);
				$sql3 = "select id_rentcar FROM RENT_cars WHERE id_car = '$xt_idcar'";
				$rs3 = $db_jeinid->Execute($sql3);
				$id_rentcarDelMaster = $rs3->fields['0'];
				$sql4 = "DELETE FROM RENT_carsuser WHERE id_rentcar = '$id_rentcarDelMaster'";
				$rs4 = $db_jeinid->Execute($sql4);
				$sql5 = "DELETE FROM RENT_cars WHERE id_car = '$xt_idcar'";
				$rs5 = $db_jeinid->Execute($sql5);
				$var_msg = 6;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		*/
		
		

		switch ($var_msg){
			case $db_jeinid->ErrorNo():
				$err	= $db_jeinid->ErrorMsg();
				$error	= str_replace(chr(39), "", $err);
				$error 	= str_replace( "'", "`", $error);
				echo"{'success' : false,'msg': $error}";
			break;
			case 1:
				echo"{'success' : true,'msg' : 'Data has been Register'}";
				break;
			case 2:
				echo"{'success' : true,'msg' : 'Data has been Canceled'}";
				break;
			case 3:
				echo"{'success' : true,'msg' : 'New Device Type has been Added'}";
				break;
			case 4:
				echo"{'success' : true,'msg' : 'Device Type has been Updated'}";
				break;
			case 5:
				echo"{'success' : true,'msg' : 'New Master has been Added'}";
				break;
			case 6:
				echo"{'success' : true,'msg' : 'Master has been Deleted'}";
				break;
			case 7:
				echo"{'success' : true,'msg' : 'Master has been Updated'}";
				break;
			case 8:
				echo"{'success' : true,'msg' : 'RESERVATION data has been Updated'}";
				break;
			case 9:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and devices in search menu before you request for RESERVATION'}";
				break;
			case 10:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and devices in search menu before you editing your request for RESERVATION'}";
				break;
		}

	}
$db_jeinid->Close();
$db_jeinid=null;
?>



















