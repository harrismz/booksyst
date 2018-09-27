<?php
	session_start();
	$url = $_SESSION['lbta_url'];
	
	echo '<title>Redirect</title>';
	echo '<p align="center">User ID is not authorize using web Reservation System. Thank You.</p>';
	echo '<meta http-equiv="refresh" content="2;url=http://'.$url.'" />';
?>