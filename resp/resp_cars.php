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
	
		if($xt_type=="register"){
			$xt_car      = isset($_REQUEST['xt_car']) ? $_REQUEST['xt_car'] : '';
			$xt_dept     = isset($_REQUEST['xt_dept']) ? $_REQUEST['xt_dept'] : '';
			$xt_incharge = isset($_REQUEST['xt_incharge']) ? $_REQUEST['xt_incharge'] : '';
			$xt_startdate= isset($_REQUEST['xt_startdate']) ? $_REQUEST['xt_startdate'] : '';
			$xt_starttime= isset($_REQUEST['xt_starttime']) ? $_REQUEST['xt_starttime'] : '';
			$xt_enddate  = isset($_REQUEST['xt_enddate']) ? $_REQUEST['xt_enddate'] : '';
			$xt_endtime  = isset($_REQUEST['xt_endtime']) ? $_REQUEST['xt_endtime'] : '';
			$startdatetime = $xt_startdate." ".$xt_starttime.".000";
			$enddatetime = $xt_enddate." ".$xt_endtime.".000";
			$xt_dest   = isset($_REQUEST['xt_dest']) ? $_REQUEST['xt_dest'] : '';
			$xt_purpose   = isset($_REQUEST['xt_purpose']) ? $_REQUEST['xt_purpose'] : '';
			$xt_remark   = isset($_REQUEST['xt_remark']) ? $_REQUEST['xt_remark'] : '';
			// /*check*/ echo "{'success': true,'msg': '$xt_car | $xt_startdate | $xt_starttime | $xt_enddate | $xt_endtime | $startdatetime | $enddatetime | $xt_dept | $xt_remark'}";
			
			try{
				$sql_check = "SELECT * FROM RENT_cars WHERE start_date < '{$enddatetime}' and end_date > '{$startdatetime}' and id_car = '{$xt_car}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				if($exists_check == 0){
					try{
						$sql = "INSERT INTO RENT_cars (id_car, dept, incharge, start_date, end_date, destination, purpose, remark, input_nik, input_date)
								VALUES ('$xt_car','$xt_dept','$xt_incharge','$startdatetime','$enddatetime','$xt_dest','$xt_purpose','$xt_remark','$booksyst_userid',$datenow)";
						$rs = $db_jeinid->Execute($sql);
						$tgl_send	= date("l, F d, Y");
						$from	    = "JEINadmin@jvc-jein.co.id";
						$bcc      	= "harris.zaki@jvc-jein.co.id";
						$to			= "catering@jvc-jein.co.id";
						$subject   = "Transport Reservation";
						$message 	= "Dear Mr. Mudasir,\r\nYou have Request of Transport Reservation on ".$tgl_send.".\r\n\r\nYou can open site http://136.198.117.48/booksyst/info/index.php?info=cars)\r\nand (http://svrfile/webform OR http://136.198.117.63/webform/) \r\n\r\nDescription : this mail is generated by system, please do not reply to the sender.";
						//$message 	= "Dear Mr. Mudasir,\r\nYou have Request of Transport Reservation on ".$tgl_send.".\n\nhere is the details :\n\n INCHARGE      : {$xt_incharge_upd}\n DEPARTMENT    : {$xt_dept_upd}\n START DATE    : {$xt_startdate_upd} - {$xt_starttime_upd}\n END DATE      : {$xt_enddate_upd} - {$xt_endtime_upd}\n DESTINATION   : {$xt_dest_upd}\n PURPOSE       : {$xt_purpose_upd}\n\nYou can open site http://136.198.117.48/booksyst/info/index.php?info=cars)\r\nand (http://svrfile/webform OR http://136.198.117.63/webform/) \r\n\r\nDescription : this mail is generated by system, please do not reply to the sender.";
						
						ini_set('SMTP', '136.198.117.7');
						ini_set('smtp_port', '25');
						ini_set('sendmail_from', $from);
						
						$headers 	= "From: 	". $from . "\r\n" . "BCC: 	". $bcc;
						$ret        = mail($to,$subject,$message,$headers);
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
		elseif($xt_type=="update"){
			$xt_idrentcar_upd= isset($_REQUEST['xt_idrentcar_upd']) ? $_REQUEST['xt_idrentcar_upd'] : '';
			$xt_car_upd      = isset($_REQUEST['xt_car_upd']) ? $_REQUEST['xt_car_upd'] : '';
			$xt_dept_upd     = isset($_REQUEST['xt_dept_upd']) ? $_REQUEST['xt_dept_upd'] : '';
			$xt_incharge_upd = isset($_REQUEST['xt_incharge_upd']) ? $_REQUEST['xt_incharge_upd'] : '';
			$xt_startdate_upd= isset($_REQUEST['xt_startdate_upd']) ? $_REQUEST['xt_startdate_upd'] : '';
			$xt_starttime_upd= isset($_REQUEST['xt_starttime_upd']) ? $_REQUEST['xt_starttime_upd'] : '';
			$xt_enddate_upd  = isset($_REQUEST['xt_enddate_upd']) ? $_REQUEST['xt_enddate_upd'] : '';
			$xt_endtime_upd  = isset($_REQUEST['xt_endtime_upd']) ? $_REQUEST['xt_endtime_upd'] : '';
			$startdatetime_upd	= $xt_startdate_upd." ".$xt_starttime_upd.".000";
			$enddatetime_upd	= $xt_enddate_upd." ".$xt_endtime_upd.".000";
			$xt_dest_upd   	= isset($_REQUEST['xt_dest_upd']) ? $_REQUEST['xt_dest_upd'] : '';
			$xt_purpose_upd = isset($_REQUEST['xt_purpose_upd']) ? $_REQUEST['xt_purpose_upd'] : '';
			$xt_remark_upd  = isset($_REQUEST['xt_remark_upd']) ? $_REQUEST['xt_remark_upd'] : '';
			// /*check*/ echo "{'success': true,'msg': '$xt_car | $xt_startdate | $xt_starttime | $xt_enddate | $xt_endtime | $startdatetime | $enddatetime | $xt_dept | $xt_remark'}";
			
			try{
				echo $sql1 = "SELECT [id_car] FROM [JEINID].[dbo].[RENT_cardata] WHERE platno = '$xt_car_upd'";
				$rs1 = $db_jeinid->Execute($sql1);
				$idcar = $rs1->fields['0'];
				
				echo '<br>'.$sql_check = "SELECT * FROM RENT_cars WHERE start_date < '{$enddatetime_upd}' and end_date > '{$startdatetime_upd}' and id_car = '{$idcar}' and id_rentcar <> '{$xt_idrentcar_upd}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				if($exists_check == 0){
					try{
						echo '<br>'.$sql = "UPDATE RENT_cars SET id_car = '$idcar', dept = '$xt_dept_upd', incharge = '$xt_incharge_upd',
								start_date = '$startdatetime_upd', end_date = '$enddatetime_upd', destination = '$xt_dest_upd',
								purpose = '$xt_purpose_upd', remark = '$xt_remark_upd', update_nik = '$booksyst_userid', update_date = $datenow
								WHERE id_rentcar = '$xt_idrentcar_upd'";
						// $rs = $db_jeinid->Execute($sql);
						
						// $tgl_send	= date("l, F d, Y");
						// $from	    = "JEINadmin@jvc-jein.co.id";
						// $bcc      	= "harris.zaki@jvc-jein.co.id";
						// $to			= "catering@jvc-jein.co.id";
						// $subject    = "Transport Reservation ( REVISE )";
						// $message 	= "Dear Mr. Mudasir,\r\nYou have Request of Transport Reservation on ".$tgl_send.".\n\nhere is the details :\n\n INCHARGE      : {$xt_incharge_upd}\n DEPARTMENT    : {$xt_dept_upd}\n START DATE    : {$xt_startdate_upd} - {$xt_starttime_upd}\n END DATE      : {$xt_enddate_upd} - {$xt_endtime_upd}\n DESTINATION   : {$xt_dest_upd}\n PURPOSE       : {$xt_purpose_upd}\n\nYou can open site http://136.198.117.48/booksyst/info/index.php?info=cars)\r\nand (http://svrfile/webform OR http://136.198.117.63/webform/) \r\n\r\nDescription : this mail is generated by system, please do not reply to the sender.";
						
						// ini_set('SMTP', '136.198.117.7');
						// ini_set('smtp_port', '25');
						// ini_set('sendmail_from', $from);
						
						// $headers 	= "From: 	". $from . "\r\n" . "BCC: 	". $bcc;
						// $ret        = mail($to,$subject,$message,$headers);
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
			$xt_idrentcar = isset($_REQUEST['xt_idrentcar']) ? $_REQUEST['xt_idrentcar'] : "";
			try{
				$sql = "DELETE FROM RENT_cars WHERE id_rentcar = '$xt_idrentcar';";
				$rs = $db_jeinid->Execute($sql);
				$sql2 = "DELETE FROM RENT_carsuser WHERE id_rentcar = '$xt_idrentcar';";
				$rs2 = $db_jeinid->Execute($sql2);
				$var_msg = 2;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "addmember"){
			$xt_idrentcardet = isset($_REQUEST['xt_idrentcardet']) ? $_REQUEST['xt_idrentcardet'] : "";
			$xt_addmember = isset($_REQUEST['xt_addmember']) ? $_REQUEST['xt_addmember'] : "";
			$xt_deptmember = isset($_REQUEST['xt_deptmember']) ? $_REQUEST['xt_deptmember'] : "";
			try{
				$sql1 = "INSERT INTO RENT_carsuser (id_rentcar, dept_member, username, input_nik, input_date)
						VALUES ('$xt_idrentcardet','$xt_deptmember', '$xt_addmember', '$booksyst_userid', $datenow)";
				$rs = $db_jeinid->Execute($sql1);
				$var_msg = 3;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "delmember"){
			$xt_idrentcardet_del = isset($_REQUEST['xt_idrentcardet_del']) ? $_REQUEST['xt_idrentcardet_del'] : "";
			$xt_username1 = isset($_REQUEST['xt_username']) ? $_REQUEST['xt_username'] : "";
			$xt_username = trim($xt_username1);
			try{
				$sql1 = "DELETE FROM RENT_carsuser WHERE id_rentcar = '$xt_idrentcardet_del' and username = '$xt_username'";
				$rs = $db_jeinid->Execute($sql1);
				$var_msg = 4;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "addmaster"){
			$xt_platno = isset($_REQUEST['xt_platno']) ? $_REQUEST['xt_platno'] : "";
			//$xt_fordept = isset($_REQUEST['xt_fordept']) ? $_REQUEST['xt_fordept'] : "";
			$xt_driver = isset($_REQUEST['xt_driver']) ? $_REQUEST['xt_driver'] : "";
			$xt_drivercall = isset($_REQUEST['xt_drivercall']) ? $_REQUEST['xt_drivercall'] : "";
			$xt_carname = isset($_REQUEST['xt_carname']) ? $_REQUEST['xt_carname'] : "";
			$xt_status = isset($_REQUEST['xt_status']) ? $_REQUEST['xt_status'] : "";
			try{
				$sql2 = "INSERT INTO RENT_cardata (platno, driver, driver_call, carname, status)
						VALUES ('$xt_platno','$xt_driver','$xt_drivercall','$xt_carname','$xt_status')";
				$rs = $db_jeinid->Execute($sql2);
				$var_msg = 5;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
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
		elseif($xt_type == "updmaster"){
			$xt_idcar_upd = isset($_REQUEST['xt_idcar_upd']) ? $_REQUEST['xt_idcar_upd'] : "";
			$xt_platno_upd = isset($_REQUEST['xt_platno_upd']) ? $_REQUEST['xt_platno_upd'] : "";
			$xt_driver_upd = isset($_REQUEST['xt_driver_upd']) ? $_REQUEST['xt_driver_upd'] : "";
			$xt_drivercall_upd = isset($_REQUEST['xt_drivercall_upd']) ? $_REQUEST['xt_drivercall_upd'] : "";
			$xt_carname_upd = isset($_REQUEST['xt_carname_upd']) ? $_REQUEST['xt_carname_upd'] : "";
			$xt_status_upd = isset($_REQUEST['xt_status_upd']) ? $_REQUEST['xt_status_upd'] : "";
			try{
				$sql2 = "UPDATE RENT_cardata SET platno = '$xt_platno_upd', driver = '$xt_driver_upd', driver_call = '$xt_drivercall_upd', carname = '$xt_carname_upd', status = '$xt_status_upd' WHERE id_car = '$xt_idcar_upd'";
				$rs2 = $db_jeinid->Execute($sql2);
				$var_msg = 7;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		switch ($var_msg){
			case $db_jeinid->ErrorNo():
				$err	= $db_jeinid->ErrorMsg();
				$error	= str_replace(chr(39), "", $err);
				echo"{'success' : false,'msg': '$db_jeinid->ErrorNo()'}";
			break;
			case 1:
				echo"{'success' : true,'msg' : 'Data has been Register'}";
				break;
			case 2:
				echo"{'success' : true,'msg' : 'Data has been Canceled'}";
				break;
			case 3:
				echo"{'success' : true,'msg' : 'New Members has been Added'}";
				break;
			case 4:
				echo"{'success' : true,'msg' : 'Member has been Delete'}";
				break;
			case 5:
				echo"{'success' : true,'msg' : 'New Master has been Added'}";
				break;
			case 6:
				echo"{'success' : true,'msg' : 'Master has been Delete'}";
				break;
			case 7:
				echo"{'success' : true,'msg' : 'Master has been Update'}";
				break;
			case 8:
				echo"{'success' : true,'msg' : 'Transport Request has been Update'}";
				break;
			case 9:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and car transport in search menu before you request the transportation'}";
				break;
			case 10:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and car transport in search menu before you editing your request of transportation'}";
				break;
		}

	}
$db_jeinid->Close();
$db_jeinid=null;
?>



















