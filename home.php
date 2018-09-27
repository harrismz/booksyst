<div class="container">
	<?php
		//	room
			if($booksyst_userid === "admin" ){
				?>
				<a href="index.php?rooms=rooms_admin">
					<div id="left">
						<img class="img_meeting" width="200px" src="asset/img/logo_meetingroom.png"/>
						<br>
						<h2 class="img_text1">MEETING ROOM RESERVATION</h2>
					</div>
				</a>
				<?php
			}
			elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir"){
				?>
				<a href="index.php?rooms=rooms">
					<div id="left">
						<img class="img_meeting" width="200px" src="asset/img/logo_meetingroom.png"/>
						<br>
						<h2 class="img_text1">MEETING ROOM RESERVATION</h2>
					</div>
				</a>
				<?php
			}
			else{
				?>
				<a href="index.php?rooms=rooms">
					<div id="left2">
						<img class="img_meeting" width="200px" src="asset/img/logo_meetingroom.png"/>
						<br>
						<h2 class="img_text1">MEETING ROOM RESERVATION</h2>
					</div>
				</a>
				<?php
			}
		
		//	transport
			if($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid === "ota"){
				?>
				<a href="index.php?cars=cars">
					<div id="middle">
						<img class="img_trans" width="250px" src="asset/img/trans.png"/>
						<br>
						<h2 class="img_text2">TRANSPORTATION RESERVATION</h2>
					</div>
				</a>
				<?php
			}
		
		//	RPA
			if($booksyst_userid === "admin" ){
			?>
			<a href="index.php?rpa=rpa">
				<div id="right">
					<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
					<br>
					<h2 class="img_text3">RPA OFFICE ROBOT</h2>
				</div>
			</a>
			<?php
			}
			elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir"){
				?>
				<a href="index.php?rpa=rpa">
					<div id="right">
						<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
						<br>
						<h2 class="img_text3">RPA OFFICE ROBOT</h2>
					</div>
				</a>
				<?php
			}
			else{
				?>
				<a href="index.php?rpa=rpa">
					<div id="right2">
						<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
						<br>
						<h2 class="img_text3">RPA OFFICE ROBOT</h2>
					</div>
				</a>
				<?php
			}
			?>
			
</div>