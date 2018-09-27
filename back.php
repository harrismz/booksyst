<?php
//start session
ob_start();
session_start();
ob_end_clean();

//include adodb 
include('adodb/adodb.inc.php');

//include database connection
include ('../adodb/con_jeinid.php');

	unset($_SESSION['booksyst_userid']);
    unset($_SESSION['booksyst_usertype']);
    unset($_SESSION['booksyst_userdept']);
    unset($_SESSION['booksyst_useremail']);
    unset($_SESSION['booksyst_userdisnm']);
    unset($_SESSION['booksyst_userlbta_type']);
    unset($_SESSION['booksyst_userdept_code']);
    unset($_SESSION['booksyst_vuserctrtype']);
	
	$_SESSION = array();
	if(session_destroy()) // Destroying All Sessions
	{
	   header('location: http://136.198.117.63/webform/webmenu.asp'); // Redirecting To Home Page
	}
// Closing Connection
$db_jeinid->Close();
?>