<!DOCTYPE html>
<html lang="en" class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7">
	<head>
		<title>BOOKING SYSTEM</title>
		<meta charset="utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="google" value="notranslate"/>
		<!-- Responsive Style -->
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<link rel="shortcut icon" href="../asset/img/leave.png"/>
		<link rel="stylesheet" href="../asset/css/style.css">
		
		<!-- Extjs -->
		<link rel="stylesheet" href="../../framework/extjs-4.2.2/resources/css/ext-all-gray.css">
		<link rel="stylesheet" href="../asset/css/extjs.css">
		<script type="text/javascript" src="../../framework/extjs-4.2.2/ext-all.js"></script>
		<script>
			<?php
				if(!empty($_GET['info'])){
					$CON = $_GET['info'];
					if($CON == "rooms" || $CON == "cars" || $CON == "rpas"){
						include($CON.'.js');
					}
					else{
					   echo 'JS not found !';
					}
				}
			?>
		</script>
	</head>
	<body>
		<?php include "header.php"?>
		<?php include "menu.php"?>
		<?php
			if(!empty($_GET['info'])){
				$CON = $_GET['info'];
				if($CON == "rooms"){
					echo '<section id="rooms"><h1>ROOM RESERVATION</h1></section>';
				}
				elseif($CON == "cars"){
					echo '<section id="cars"><h1>TRANSPORT RESERVATION</h1></section>';
				}
				elseif($CON == "rpas"){
					echo '<section id="rpas"><h1>RPA OFFICE ROBOT</h1></section>';
				}
			}
			else{
				include('home.php');
			}
		?>
		<?php include "../footer.php"; ?>
	</body>
</html>