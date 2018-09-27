<nav>
    <ul>
		<li><a href="back.php" target="_blank"><span class="icon-user-icon8"></span><?=strtoupper($booksyst_userid)?> |</a></li>
		<?php
		if($booksyst_userid === "admin" ){
			?>
			<li><a href="index.php?rooms=rooms_admin"><span class="icon-register-icon8"></span>ROOM RESERVATION</a></li>
			<?php
		}
		else{
			?>
			<li><a href="index.php?rooms=rooms"><span class="icon-register-icon8"></span>ROOM RESERVATION</a></li>
			<?php
		}
		if($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" ){
			?>
			<li><a href="index.php?cars=cars"><span class="icon-register-icon8"></span>TRANSPORT RESERVATION</a></li>
			<?php
		}
		?>
		<li><a href="index.php?rpa=rpa"><span class="icon-register-icon8"></span>RPA OFFICE ROBOT</a></li>
		<li class="nav-right">
			<a class="menu" href="back.php"><span class="icon-back-icon8"></span> BACK TO JEINWEB</a>
			<a href="asset/WIReservationSystem.pdf" target="_blank"><span class="icon-help-icon8"></span>HELP</a>
		</li>
    </ul>
</nav>