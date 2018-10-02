<?php
	session_start();
	
	$booksyst_userid	= $_SESSION['booksyst_userid'];
	$booksyst_usertype	= $_SESSION['booksyst_usertype'];
	$booksyst_userdept	= $_SESSION['booksyst_userdept'];
	$booksyst_vuserctrtype	= $_SESSION['booksyst_vuserctrtype'];
	
	// echo '<br>'.$booksyst_userid	= 'admin';
	// echo '<br>'.$booksyst_usertype	= '0';
	// echo '<br>'.$booksyst_userdept	= '26';
	// echo '<br>'.$booksyst_vuserctrtype	= '1';

	if($booksyst_userid <> "" and $booksyst_usertype <> "" and $booksyst_userdept <> ""){
?>
	<!DOCTYPE html>
	<html lang="en" class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7">
		<head>
			<title>BOOKING SYSTEM</title>
			<meta charset="utf-8"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<meta name="google" value="notranslate"/>
			<!-- Responsive Style -->
			<meta name="viewport" content="width=device-width, initial-scale=1"> 
			<link rel="shortcut icon" href="asset/img/leave.png"/>
			<link rel="stylesheet" href="asset/css/style.css">
			
			<!-- Extjs -->
			<link rel="stylesheet" href="../extjs-4.2.2/resources/css/ext-all-gray.css">
			<link rel="stylesheet" href="asset/css/extjs.css">
			<script type="text/javascript" src="../extjs-4.2.2/ext-all.js"></script>
			<script>
				<?php
					if(!empty($_GET['rooms'])){
						$CON_dir = 'rooms';
						$CONpages = scandir($CON_dir, 0);
						unset($CONpages[0], $CONpages[1]);

						$CON = $_GET['rooms'];
						if(in_array($CON.'.js', $CONpages)){
						 include($CON_dir.'/'.$CON.'.js');
						} 
						else{
						   echo 'JS not found !';
						}
					}
					elseif(!empty($_GET['cars'])){
						$CON_dir = 'cars';
						$CONpages = scandir($CON_dir, 0);
						unset($CONpages[0], $CONpages[1]);

						$CON = $_GET['cars'];
						if(in_array($CON.'.js', $CONpages)){
						 include($CON_dir.'/'.$CON.'.js');
						} 
						else{
						   echo 'JS not found !';
						}
					}
					elseif(!empty($_GET['rpa'])){
						$CON_dir = 'rpa';
						$CONpages = scandir($CON_dir, 0);
						unset($CONpages[0], $CONpages[1]);

						$CON = $_GET['rpa'];
						if(in_array($CON.'.js', $CONpages)){
						 include($CON_dir.'/'.$CON.'.js');
						} 
						else{
						   echo 'JS not found !';
						}
					}
					elseif(!empty($_GET['device'])){
						$CON_dir = 'device';
						$CONpages = scandir($CON_dir, 0);
						unset($CONpages[0], $CONpages[1]);

						$CON = $_GET['device'];
						if(in_array($CON.'.js', $CONpages)){
						 include($CON_dir.'/'.$CON.'.js');
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
				if(!empty($_GET['rooms'])){
					$show_dir = 'rooms';
					$showpages = scandir($show_dir, 0);
					unset($showpages[0], $showpages[1]);
					
					$show = $_GET['rooms'];
					if(in_array($show.'.js', $showpages)){
						echo '<section id="rooms"><h1>ROOM RESERVATION</h1></section>';
					}
					else{
						echo '<section>Page not found !</section>';
					}
				}
				elseif(!empty($_GET['cars'])){
					$show_dir = 'cars';
					$showpages = scandir($show_dir, 0);
					unset($showpages[0], $showpages[1]);

					$show = $_GET['cars'];
					if(in_array($show.'.js', $showpages)){
						echo '<section id="cars"><h1>TRANSPORT RESERVATION</h1></section>';
					} 
					else{
					   echo '<section>Page not found !</section>';
					}
				}
				elseif(!empty($_GET['rpa'])){
					$show_dir = 'rpa';
					$showpages = scandir($show_dir, 0);
					unset($showpages[0], $showpages[1]);

					$show = $_GET['rpa'];
					if(in_array($show.'.js', $showpages)){
						echo '<section id="rpa"><h1>RPA RESERVATION</h1></section>';
					} 
					else{
					   echo '<section>Page not found !</section>';
					}
				}
				elseif(!empty($_GET['device'])){
					$show_dir = 'device';
					$showpages = scandir($show_dir, 0);
					unset($showpages[0], $showpages[1]);

					$show = $_GET['device'];
					if(in_array($show.'.js', $showpages)){
						echo '<section id="device"><h1>DEVICE RESERVATION</h1></section>';
					} 
					else{
					   echo '<section>Page not found !</section>';
					}
				}
				else{
					include('home.php');
				}
			?>
			<?php include "footer.php"; ?>
		</body>
	</html>
<?php		
	}
	else{
		header('location:http://svrfile/webform/default.asp');
	}
?>