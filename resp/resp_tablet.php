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
			$xt_tablet     = isset($_REQUEST['xt_tablet']) ? $_REQUEST['xt_tablet'] : '';
			$xt_date     = isset($_REQUEST['xt_date']) ? $_REQUEST['xt_date'] : '';
			$xt_starttime= isset($_REQUEST['xt_starttime']) ? $_REQUEST['xt_starttime'] : '';
			$xt_endtime  = isset($_REQUEST['xt_endtime']) ? $_REQUEST['xt_endtime'] : '';
			$xt_dept     = isset($_REQUEST['xt_dept']) ? $_REQUEST['xt_dept'] : '';
			$xt_incharge = isset($_REQUEST['xt_incharge']) ? $_REQUEST['xt_incharge'] : '';
			$xt_purpose  = isset($_REQUEST['xt_purpose']) ? $_REQUEST['xt_purpose'] : '';
			$xt_remark  = isset($_REQUEST['xt_remark']) ? $_REQUEST['xt_remark'] : '';
		//	/*check*/	echo "{'success': true,'msg': '$xt_tablet | $xt_date | $xt_starttime | $xt_endtime | $xt_dept | $xt_purpose'}";
			
			try{
				$sql_check = "SELECT * FROM RENT_tablet WHERE start_time < '{$xt_endtime}' and end_time > '{$xt_starttime}' and date = '{$xt_date}' and id_tablet = '{$xt_tablet}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				if($exists_check == 0){
					try{
						$sql = "INSERT INTO RENT_tablet (id_tablet, date, start_time, end_time, dept, incharge, purpose, remark, input_nik, input_date)
								VALUES ('$xt_tablet','$xt_date','$xt_starttime','$xt_endtime','$xt_dept','$xt_incharge','$xt_purpose','$xt_remark','$booksyst_userid',$datenow)";
						$rs = $db_jeinid->Execute($sql);
						$var_msg = 1;
					}
					catch (exception $e){
						$var_msg = $db_jeinid->ErrorNo();
					}
				}
				else{
					$var_msg = 6;
				}
			}catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		
		elseif($xt_type=="update"){
			$xt_idrenttablet_upd = isset($_REQUEST['xt_idrenttablet_upd']) ? $_REQUEST['xt_idrenttablet_upd'] : '';
			$xt_tablet_upd     = isset($_REQUEST['xt_tablet_upd']) ? $_REQUEST['xt_tablet_upd'] : '';
			$xt_date_upd     = isset($_REQUEST['xt_date_upd']) ? $_REQUEST['xt_date_upd'] : '';
			$xt_starttime_upd= isset($_REQUEST['xt_starttime_upd']) ? $_REQUEST['xt_starttime_upd'] : '';
			$xt_endtime_upd  = isset($_REQUEST['xt_endtime_upd']) ? $_REQUEST['xt_endtime_upd'] : '';
			$xt_dept_upd     = isset($_REQUEST['xt_dept_upd']) ? $_REQUEST['xt_dept_upd'] : '';
			$xt_incharge_upd = isset($_REQUEST['xt_incharge_upd']) ? $_REQUEST['xt_incharge_upd'] : '';
			$xt_purpose_upd  = isset($_REQUEST['xt_purpose_upd']) ? $_REQUEST['xt_purpose_upd'] : '';
			$xt_remark_upd  = isset($_REQUEST['xt_remark_upd']) ? $_REQUEST['xt_remark_upd'] : '';
		//	/*check*/	echo "{'success': true,'msg': '$xt_tablet | $xt_date | $xt_starttime | $xt_endtime | $xt_dept | $xt_purpose'}";
			try{
				$sql1 = "SELECT [id_tablet] FROM [JEINID].[dbo].[RENT_tabletdata] WHERE tabletname = '$xt_tablet_upd'";
				$rs1 = $db_jeinid->Execute($sql1);
				$idtablet = $rs1->fields['0'];
				
				$sql_check = "SELECT * FROM RENT_tablet WHERE start_time < '{$xt_endtime_upd}' and end_time > '{$xt_starttime_upd}' and date = '{$xt_date_upd}' and id_tablet = '{$idtablet}' and id_renttablet <> '{$xt_idrenttablet_upd}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				$sql_chkuser = "SELECT input_nik FROM RENT_tablet WHERE id_renttablet = '{$xt_idrenttablet_upd}'";
				$rs_chkuser = $db_jeinid->Execute($sql_chkuser);
				$chkuser = $rs_chkuser->fields[0];
				
				if(($chkuser === $booksyst_userid) or ($booksyst_userid === 'admin')){
					if($exists_check == 0){
						try{
							$sql = "UPDATE RENT_tablet SET id_tablet = '$idtablet', date = '$xt_date_upd', start_time = '$xt_starttime_upd',
									end_time = '$xt_endtime_upd', dept = '$xt_dept_upd', incharge = '$xt_incharge_upd',
									purpose = '$xt_purpose_upd', remark = '$xt_remark_upd', update_nik = '$booksyst_userid', update_date = $datenow
									WHERE id_renttablet = '$xt_idrenttablet_upd'";
							$rs = $db_jeinid->Execute($sql);
							$var_msg = 5;
						}
						catch (exception $e){
							$var_msg = $db_jeinid->ErrorNo();
						}
					}
					else{
						$var_msg = 7;
					}
				}
				else{
					$var_msg = 8;
				}
				
			}catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}	
		}
		elseif($xt_type == "cancel"){
			$xt_idrenttablet = isset($_REQUEST['xt_idrenttablet']) ? $_REQUEST['xt_idrenttablet'] : "";
			
			try{
				$sql_chkuser = "SELECT input_nik FROM RENT_tablet WHERE id_renttablet = '{$xt_idrenttablet}'";
				$rs_chkuser = $db_jeinid->Execute($sql_chkuser);
				$chkuser = $rs_chkuser->fields[0];
				if(($chkuser === $booksyst_userid) or ($booksyst_userid === 'admin')){
					$sql = "DELETE FROM RENT_tablet WHERE id_renttablet = '$xt_idrenttablet';";
					$rs = $db_jeinid->Execute($sql);
					$sql2 = "DELETE FROM RENT_tabletuser WHERE id_renttablet = '$xt_idrenttablet';";
					$rs2 = $db_jeinid->Execute($sql2);
					$var_msg = 2;
				}
				else{
					$var_msg = 9;
				}
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		switch ($var_msg){
			case $db_jeinid->ErrorNo():
				$err	= $db_jeinid->ErrorMsg();
				$error	= str_replace(chr(39), "", $err);
				echo"{'failure' : true,'msg': '$error'}";
			break;
			case 1:
				echo"{'success' : true,'msg' : 'Data has been Register'}";
				break;
			case 2:
				echo"{'success' : true,'msg' : 'Data has been Canceled'}";
				break;
			case 5:
				echo"{'success' : true,'msg' : 'Data has been Edited'}";
				break;
			case 6:
				echo"{'failure' : true,'msg' : 'This date already reserved, Please Check date and License MEETING in search menu before you register License MEETING.'}";
				break;
			case 7:
				echo"{'failure' : true,'msg' : 'This date already reserved, Please Check date and License MEETING in search menu before you editing License MEETING.'}";
				break;
			case 8:
				echo"{'failure' : true,'msg' : 'You do not have access to edit this data'}";
				break;
			case 9:
				echo"{'failure' : true,'msg' : 'You do not have access to cancel this License MEETING Reservation'}";
				break;
		}
	}
	
$db_jeinid->Close();
$db_jeinid=null;
?>



















