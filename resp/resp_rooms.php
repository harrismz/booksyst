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
			$xt_room     = isset($_REQUEST['xt_room']) ? $_REQUEST['xt_room'] : '';
			$xt_date     = isset($_REQUEST['xt_date']) ? $_REQUEST['xt_date'] : '';
			$xt_starttime= isset($_REQUEST['xt_starttime']) ? $_REQUEST['xt_starttime'] : '';
			$xt_endtime  = isset($_REQUEST['xt_endtime']) ? $_REQUEST['xt_endtime'] : '';
			$xt_dept     = isset($_REQUEST['xt_dept']) ? $_REQUEST['xt_dept'] : '';
			$xt_incharge = isset($_REQUEST['xt_incharge']) ? $_REQUEST['xt_incharge'] : '';
			$xt_purpose  = isset($_REQUEST['xt_purpose']) ? $_REQUEST['xt_purpose'] : '';
			$xt_remark  = isset($_REQUEST['xt_remark']) ? $_REQUEST['xt_remark'] : '';
		//	/*check*/	echo "{'success': true,'msg': '$xt_room | $xt_date | $xt_starttime | $xt_endtime | $xt_dept | $xt_purpose'}";
			
			try{
				$sql_check = "SELECT * FROM RENT_rooms WHERE start_time < '{$xt_endtime}' and end_time > '{$xt_starttime}' and date = '{$xt_date}' and id_room = '{$xt_room}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				if($exists_check == 0){
					try{
						$sql = "INSERT INTO RENT_rooms (id_room, date, start_time, end_time, dept, incharge, purpose, remark, input_nik, input_date)
								VALUES ('$xt_room','$xt_date','$xt_starttime','$xt_endtime','$xt_dept','$xt_incharge','$xt_purpose','$xt_remark','$booksyst_userid',$datenow)";
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
			$xt_idrentroom_upd = isset($_REQUEST['xt_idrentroom_upd']) ? $_REQUEST['xt_idrentroom_upd'] : '';
			$xt_room_upd     = isset($_REQUEST['xt_room_upd']) ? $_REQUEST['xt_room_upd'] : '';
			$xt_date_upd     = isset($_REQUEST['xt_date_upd']) ? $_REQUEST['xt_date_upd'] : '';
			$xt_starttime_upd= isset($_REQUEST['xt_starttime_upd']) ? $_REQUEST['xt_starttime_upd'] : '';
			$xt_endtime_upd  = isset($_REQUEST['xt_endtime_upd']) ? $_REQUEST['xt_endtime_upd'] : '';
			$xt_dept_upd     = isset($_REQUEST['xt_dept_upd']) ? $_REQUEST['xt_dept_upd'] : '';
			$xt_incharge_upd = isset($_REQUEST['xt_incharge_upd']) ? $_REQUEST['xt_incharge_upd'] : '';
			$xt_purpose_upd  = isset($_REQUEST['xt_purpose_upd']) ? $_REQUEST['xt_purpose_upd'] : '';
			$xt_remark_upd  = isset($_REQUEST['xt_remark_upd']) ? $_REQUEST['xt_remark_upd'] : '';
		//	/*check*/	echo "{'success': true,'msg': '$xt_room | $xt_date | $xt_starttime | $xt_endtime | $xt_dept | $xt_purpose'}";
			try{
				$sql1 = "SELECT [id_room] FROM [JEINID].[dbo].[RENT_roomdata] WHERE roomname = '$xt_room_upd'";
				$rs1 = $db_jeinid->Execute($sql1);
				$idroom = $rs1->fields['0'];
				
				$sql_check = "SELECT * FROM RENT_rooms WHERE start_time < '{$xt_endtime_upd}' and end_time > '{$xt_starttime_upd}' and date = '{$xt_date_upd}' and id_room = '{$idroom}' and id_rentroom <> '{$xt_idrentroom_upd}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				$sql_chkuser = "SELECT input_nik FROM RENT_rooms WHERE id_rentroom = '{$xt_idrentroom_upd}'";
				$rs_chkuser = $db_jeinid->Execute($sql_chkuser);
				$chkuser = $rs_chkuser->fields[0];
				
				if(($chkuser === $booksyst_userid) or ($booksyst_userid === 'admin') or ($booksyst_userid === 'kenya')){
					if($exists_check == 0){
						try{
							$sql = "UPDATE RENT_rooms SET id_room = '$idroom', date = '$xt_date_upd', start_time = '$xt_starttime_upd',
									end_time = '$xt_endtime_upd', dept = '$xt_dept_upd', incharge = '$xt_incharge_upd',
									purpose = '$xt_purpose_upd', remark = '$xt_remark_upd', update_nik = '$booksyst_userid', update_date = $datenow
									WHERE id_rentroom = '$xt_idrentroom_upd'";
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
			$xt_idrentroom = isset($_REQUEST['xt_idrentroom']) ? $_REQUEST['xt_idrentroom'] : "";
			
			try{
				$sql_chkuser = "SELECT input_nik FROM RENT_rooms WHERE id_rentroom = '{$xt_idrentroom}'";
				$rs_chkuser = $db_jeinid->Execute($sql_chkuser);
				$chkuser = $rs_chkuser->fields[0];
				if(($chkuser === $booksyst_userid) or ($booksyst_userid === 'admin') or ($booksyst_userid === 'kenya')){
					$sql = "DELETE FROM RENT_rooms WHERE id_rentroom = '$xt_idrentroom';";
					$rs = $db_jeinid->Execute($sql);
					$sql2 = "DELETE FROM RENT_roomuser WHERE id_rentroom = '$xt_idrentroom';";
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
		elseif($xt_type == "addmember"){
			$xt_idrentroomdet = isset($_REQUEST['xt_idrentroomdet']) ? $_REQUEST['xt_idrentroomdet'] : "";
			$xt_deptmember = isset($_REQUEST['xt_deptmember']) ? $_REQUEST['xt_deptmember'] : "";
			$xt_addmember = isset($_REQUEST['xt_addmember']) ? $_REQUEST['xt_addmember'] : "";
			try{
				$sql1 = "INSERT INTO RENT_roomuser (id_rentroom, dept_member, username, input_nik, input_date)
						VALUES ('$xt_idrentroomdet','$xt_deptmember','$xt_addmember', '$booksyst_userid', $datenow)";
				$rs = $db_jeinid->Execute($sql1);
				$var_msg = 3;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "delmember"){
			$xt_idrentroomdet_del = isset($_REQUEST['xt_idrentroomdet_del']) ? $_REQUEST['xt_idrentroomdet_del'] : "";
			$xt_username1 = isset($_REQUEST['xt_username']) ? $_REQUEST['xt_username'] : "";
			$xt_username = trim($xt_username1);
			try{
				$sql1 = "DELETE FROM RENT_roomuser WHERE id_rentroom = '$xt_idrentroomdet_del' and username = '$xt_username'";
				$rs = $db_jeinid->Execute($sql1);
				$var_msg = 4;
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		switch ($var_msg){
			case $db_jeinid->ErrorNo():
				$err	= $db_jeinid->ErrorMsg();
				$error	= str_replace(chr(39), "", $err);
				echo"{'success' : false,'msg': '$error'}";
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
				echo"{'success' : true,'msg' : 'Data has been Edited'}";
				break;
			case 6:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and room in search menu before you register meeting room.'}";
				break;
			case 7:
				echo"{'success' : false,'msg' : 'This date already reserved, Please Check date and room in search menu before you editing meeting room.'}";
				break;
			case 8:
				echo"{'success' : false,'msg' : 'You do not have access to edit this data'}";
				break;
			case 9:
				echo"{'success' : false,'msg' : 'You do not have access to cancel this room reservation'}";
				break;
		}
	}
	
/*	elseif($xt_type=="cancel"){
		$xt_id_order	= isset($_REQUEST['xt_id_order']) ? $_REQUEST['xt_id_order'] : '';
		$xt_orderno		= isset($_REQUEST['xt_orderno']) ? $_REQUEST['xt_orderno'] : '';
		$xt_jigno		= isset($_REQUEST['xt_jigno']) ? $_REQUEST['xt_jigno'] : '';
		$xt_model_name	= isset($_REQUEST['xt_model_name']) ? $_REQUEST['xt_model_name'] : '';
		$xt_item_name	= isset($_REQUEST['xt_item_name']) ? $_REQUEST['xt_item_name'] : '';
		$xt_remark		= isset($_REQUEST['xt_remark']) ? $_REQUEST['xt_remark'] : '';
		$xt_rank		= isset($_REQUEST['xt_rank']) ? $_REQUEST['xt_rank'] : '';
		$xt_user		= isset($_REQUEST['xt_user']) ? $_REQUEST['xt_user'] : '';
		$xt_requestor	= isset($_REQUEST['xt_requestor']) ? $_REQUEST['xt_requestor'] : '';
		$xt_pic			= isset($_REQUEST['xt_pic']) ? $_REQUEST['xt_pic'] : '';
		$xt_order_rcv	= isset($_REQUEST['xt_order_rcv']) ? $_REQUEST['xt_order_rcv'] : '';
		$xt_reg_deliv	= isset($_REQUEST['xt_reg_deliv']) ? $_REQUEST['xt_reg_deliv'] : '';
		$xt_fns_date	= isset($_REQUEST['xt_fns_date']) ? $_REQUEST['xt_fns_date'] : '';
		$xt_status_id	= isset($_REQUEST['xt_status_id']) ? $_REQUEST['xt_status_id'] : '';
	//	/*check*///	echo "{'success': true,'msg': '$xt_id_order | $xt_orderno | $xt_item_name | $xt_jigno | $xt_model_name | $xt_remark | $xt_rank | $xt_user | $xt_requestor | $xt_pic | $xt_order_rcv | $xt_reg_deliv | $xt_fns_date | $xt_status | $nik'}";
	
	/*	try{
			$sql = "UPDATE t_order SET 
					jigno = '{$xt_jigno}', modname = '{$xt_model_name}', item_name = '{$xt_item_name}', remarks = '{$xt_remark}',
					rank = '{$xt_rank}', user = '{$xt_user}', requestor = '{$xt_requestor}', pic = '{$xt_pic}',
					order_received = '{$xt_order_rcv}', request_delivery = '{$xt_reg_deliv}', finish_date = '{$xt_fns_date}',
					status = '{$xt_status_id}', update_user = '{$nik}', update_date = {$datetime}
					WHERE order_no = '{$xt_orderno}'";
			$rs = $db_jnc->Execute($sql);
			$rs->Close();
			
			echo "{
				'success': true,
				'msg': 'Data has been updated '
			}";
		}
		catch (exception $e){
			$err_no = $conn->ErrorNo();
				$err_msg = $conn->ErrorMsg();
				$error	= str_replace( "'", " ", $err_msg);
				
				switch ($err_no)
				{
					case "$err_no":
						echo "{
							'success': false,
							'msg': '[$err_no] : $error (NO)'
						}";
					break;
				}	
		}
	}
	elseif($xt_type=="addmember"){
	//	echo "{'success': true,'msg': 'delete'}";
		$xt_id_order_del	= isset($_REQUEST['xt_id_order_del']) ? $_REQUEST['xt_id_order_del'] : '';
		$xt_nm_file_del		= isset($_REQUEST['xt_nm_file_del']) ? $_REQUEST['xt_nm_file_del'] : '';
		$date_upload		= date("Ymd");		
		$target1			= $_SERVER["DOCUMENT_ROOT"]."/jncc/order_request/";
		$direktori1			= $target1.$date_upload.'/';
		$path				= $direktori1.$xt_nm_file_del;
		try{
		//	unlink($path);
			$sql1 = "delete from t_jig where id_order ='{$xt_id_order_del}';";
			$sql2 = "delete from t_checker where id_order ='{$xt_id_order_del}';";
			$sql3 = "DELETE FROM t_order WHERE id_order='{$xt_id_order_del}';";
			$rs1 = $db_jnc->Execute($sql1);
			$rs2 = $db_jnc->Execute($sql2);
			$rs3 = $db_jnc->Execute($sql3);
			$err_no = "1";
		
		
		}
		catch(Exception $e){
			$err_no 	= $db_jnc->ErrorNo();
			$err_msg	= $db_jnc->ErrorMsg();
			$error		= str_replace("'"," ",$err_msg);
		}
		switch($err_no){
			case"1":
				echo"{
					'success' : true,
					'msg' : 'Data has been deleted'
				}";
			break;
			case"$err_no":
				echo"{
					'success' : true,
					'msg' : '[$err_no] : $error'
				}";
			break;
		}
	}
	elseif($xt_type=="delmember"){
	//	echo "{'success': true,'msg': 'upload'}";
		$xt_id_order_upl	= isset($_REQUEST['xt_id_order_upl']) ? $_REQUEST['xt_id_order_upl'] : '';
		$xt_orderno_upl	= isset($_REQUEST['xt_orderno_upl']) ? $_REQUEST['xt_orderno_upl'] : '';

		$tgl_upload		= "date_format(now(),'%Y-%m-%d')";
		$date_upload	= date("Ymd");		
		$target1		= $_SERVER["DOCUMENT_ROOT"]."/jncc/order_request/";
		$target2		= "../jncc/order_request/";
		$direktori1 	= $target1.$date_upload.'/';
		$direktori2 	= $target2.$date_upload.'/';
		
		$lokasi_file	= isset($_FILES['xt_file_upl']['tmp_name']) ? $_FILES['xt_file_upl']['tmp_name'] : '';
		$tipe_file		= isset($_FILES['xt_file_upl']['type']) ? $_FILES['xt_file_upl']['type'] : '';
		$nama_file		= isset($_FILES['xt_file_upl']['name']) ? $_FILES['xt_file_upl']['name'] : '';
		$size_file		= isset($_FILES['xt_file_upl']['size']) ? $_FILES['xt_file_upl']['size'] : '';
		
		$pisah		= explode(".", $nama_file);
		$arrays		= (count($pisah)-1);
		$typefile	= $pisah[$arrays];
		$types 		= 'pdf';
		$lop		= explode(",",$types);
		$total		= count($lop);
		$validfile	= false;
		for ($i = 0; $i < $total; $i++) {
			if( $typefile == $lop[$i] ){
				$validfile = true;
			}
		}
		
		if ($validfile == false) {
			echo "{
				'success': false,
				'msg': 'format file (*.$typefile) salah, masukan file format (*.pdf).'
			}";
		}
		else{
			try{
				// menyimpan nama dan size data
				 $file_name  = $xt_orderno_upl."_".$date_upload.".".$typefile;
				//--------------------------------------------------------------------------//
				
				/*	echo "{
						'success': false,
						'msg': '$file_name | $xt_id_order_upl | $direktori2 | $xt_orderno_upl | $xt_id_order_upl tes'
					}";
				*/
				
	/*			$sql = "SELECT nama_file FROM db_jncc.t_order WHERE order_no = '{$xt_orderno_upl}' and id_order = '{$xt_id_order_upl}'";
				$rs = $db_jnc->Execute($sql);
				$file = $rs->fields['0'];
				$rs->Close();
				
				if($file==""){
					$sql = "UPDATE t_order SET 
							nama_file = '{$file_name}', file_path = '{$direktori2}', tgl_upload = $tgl_upload
							WHERE order_no = '{$xt_orderno_upl}' and id_order = '{$xt_id_order_upl}'";
					$rs = $db_jnc->Execute($sql);
					$rs->Close();
					
					if (file_exists($direktori1) == 0) {
						mkdir($direktori1, 0777, true);
						move_uploaded_file($lokasi_file, $direktori1 . $file_name);
					}
					else{
						move_uploaded_file($lokasi_file, $direktori1 . $file_name);
					}
				
					echo "{
						'success': true,
						'msg': 'File has been Upload'
					}";
				}
				else{
					$path = $direktori1.$file;
					unlink($path);
					$sql = "UPDATE t_order SET 
							nama_file = '{$file_name}', file_path = '{$direktori2}', tgl_upload = $tgl_upload
							WHERE order_no = '{$xt_orderno_upl}' and id_order = '{$xt_id_order_upl}'";
					$rs = $db_jnc->Execute($sql);
					$rs->Close();
					
					if (file_exists($direktori1) == 0) {
						mkdir($direktori1, 0777, true);
						move_uploaded_file($lokasi_file, $direktori1 . $file_name);
					}
					else{
						move_uploaded_file($lokasi_file, $direktori1 . $file_name);
					}
				
					echo "{
						'success': true,
						'msg': 'File has been Upload'
					}";
				}
			}
			catch (exception $e){
				$err_no = $conn->ErrorNo();
					$err_msg = $conn->ErrorMsg();
					$error	= str_replace( "'", " ", $err_msg);
					
					switch ($err_no)
					{
						case "$err_no":
							echo "{
								'success': false,
								'msg': '[$err_no] : $error (NO)'
							}";
						break;
					}	
			}
		}
	}
	else{
		echo "{'success': false,'msg': 'RESP.ROOMS ERROR'}";
	}

$db_jeinid->Close();
$db_jeinid=null;*/
?>



















