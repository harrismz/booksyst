<?php
	session_start();
    include ('../adodb/con_jeinid.php');

	$vuserid 	= $_REQUEST['userid'];
	$vusertype 	= $_REQUEST['usertype'];
	$vuserdept 	= $_REQUEST['userdept'];
	$vuserctrtype 	= $_REQUEST['userctrtype'];
    $_SESSION['lbta_url'] 		= $_REQUEST['url'];

 //    $vuserid 	= 'clerk-iqc';
	// $vusertype 	= '0';
	// $vuserdept 	= '22';
	// $vuserctrtype 	= '1';
 //    $_SESSION['lbta_url'] 		= $_REQUEST['url'];

 //    $vuserid 	= 'mudasir';
	// $vusertype 	= '0';
	// $vuserdept 	= '15';
	// $vuserctrtype 	= '6';
 //    $_SESSION['lbta_url'] 		= $_REQUEST['url'];

 //     $vuserid 	= 'admin';
	// $vusertype 	= '0';
	// $vuserdept 	= '26';
	// $vuserctrtype 	= '1';
 //    $_SESSION['lbta_url'] 		= $_REQUEST['url'];

 //    $vuserid 	= 'clerk-eng';
	// $vusertype 	= '0';
	// $vuserdept 	= '26';
	// $vuserctrtype 	= '6';
 //    $_SESSION['lbta_url'] 		= $_REQUEST['url'];
	
	$rs = $db_jeinid->execute("select lbta_type from UserTbl where userid = '".$vuserid."'");
	$akses = $rs->fields[0];
    
    try{
        $sql    = "SELECT [UserID],[Dept],[email],upper([Disname]) as Disnm,[lbta_type],[dept_code]
                  FROM [JEINID].[dbo].[UserTbl]
                  WHERE UserId = '{$vuserid}'";
        $rs     = $db_jeinid->Execute($sql);
        
        $UserID     = trim($rs->fields['0']);
        $Dept       = trim($rs->fields['1']);
        $email      = trim($rs->fields['2']);
        $Disnm      = trim($rs->fields['3']);
        $lbta_type  = trim($rs->fields['4']);
        $dept_code  = trim($rs->fields['5']);
    }
    catch (Exception $ex){
        echo '[[[MYSQL]]] :::'.$ex->getMessage();
    }

	$_SESSION['booksyst_vuserctrtype']       = $vuserctrtype;
	$_SESSION['booksyst_userid']       = $vuserid;
	$_SESSION['booksyst_usertype']     = $vusertype;
	$_SESSION['booksyst_userdept']     = $vuserdept;
	$_SESSION['booksyst_useremail']    = $email;
	$_SESSION['booksyst_userdisnm']    = $Disnm;
	$_SESSION['booksyst_userlbta_type']= $lbta_type;
	$_SESSION['booksyst_userdept_code']= $dept_code;

    //# if ($_SESSION['booksyst_usertype'] <> "" && $akses <> '1'){
	//# 	header('location:index.php');
	//# }
	//# elseif($akses == 1){
    //#        header('location:authoraccess.php');
	//# }
	//# else{
	//# 	header('location:http://svrfile/webform/default.asp');
	//# }
	
	if ($_SESSION['booksyst_usertype'] <> ""){
		header('location:index.php');
	}
	else{
		header('location:http://svrfile/webform/default.asp');
	}
?>