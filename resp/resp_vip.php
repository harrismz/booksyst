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
		if($xt_type=="adduservip"){
			$xt_vipuser_add  = isset($_REQUEST['xt_masteruser']) ? $_REQUEST['xt_masteruser'] : '';
			///*check*/	echo "{'success': true,'msg': '$xt_vipid_add | $xt_type'}";
			
			try{
				$sql_check = "SELECT * FROM RENT_userviproom WHERE vipuser = '{$xt_vipuser_add}'";
				$rs_check = $db_jeinid->Execute($sql_check);
				$exists_check = $rs_check->RecordCount();
				
				if($exists_check == 0){
					try{
						$sql = "INSERT INTO RENT_userviproom (vipuser, input_user, input_date)
								VALUES ('$xt_vipuser_add','$booksyst_userid',$datenow)";
						$rs = $db_jeinid->Execute($sql);
						$var_msg = 1;
					}
					catch (exception $e){
						$var_msg = $db_jeinid->ErrorNo();
					}
				}
				else{
					$var_msg = 3;
				}
			}
			catch(exception $e){
				$var_msg = $db_jeinid->ErrorNo();
			}
		}
		elseif($xt_type == "deleteuservip"){
			$xt_vipid_del = isset($_REQUEST['xt_vipid']) ? $_REQUEST['xt_vipid'] : "";
		///*check*/	echo "{'success': true,'msg': '$xt_type | $xt_vipid_del'}";
			try{
				$sql1 = "DELETE FROM RENT_userviproom WHERE vipid = '$xt_vipid_del'";
				$rs = $db_jeinid->Execute($sql1);
				$var_msg = 2;
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
				echo"{'success' : true,'msg' : 'User Registered.'}";
				break;
			case 2:
				echo"{'success' : true,'msg' : 'User Deleted'}";
				break;
			case 3:
				echo"{'success' : false,'msg' : 'User already exists.'}";
				break;
		}
	}
$db_jeinid->Close();
$db_jeinid=null;
?>



















