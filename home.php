<div class="container">
	<?php
		//	room
			if($booksyst_userid === "admin" ){
				?>
				<a href="index.php?rooms=rooms_admin">
					<div id="left4">
						<img class="img_meeting" width="200px" src="asset/img/logo_meetingroom.png"/>
						<br>
						<h2 class="img_text1">MEETING ROOM RESERVATION</h2>
					</div>
				</a>
				<?php
			}
			elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid == "indah" or $booksyst_userid === "ota"){
				?>
				<a href="index.php?rooms=rooms">
					<div id="left4">
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
					<div id="left3">
						<img class="img_meeting" width="200px" src="asset/img/logo_meetingroom.png"/>
						<br>
						<h2 class="img_text1">MEETING ROOM RESERVATION</h2>
					</div>
				</a>
				<?php
			}
		
		//	transport
			if($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid == "indah" or $booksyst_userid === "ota"){
				?>
				<a href="index.php?cars=cars">
					<div id="middle41">
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
				<div id="middle42">
					<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
					<br>
					<h2 class="img_text3">OTHER FACILITY</h2>
				</div>
			</a>
			<?php
			}
			elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid == "indah" or $booksyst_userid === "ota"){
				?>
				<a href="index.php?rpa=rpa">
					<div id="middle42">
						<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
						<br>
						<h2 class="img_text3">OTHER FACILITY</h2>
					</div>
				</a>
				<?php
			}
			else{
				?>
				<a href="index.php?rpa=rpa">
					<div id="middle3">
						<img class="img_rpa" width="130px" src="asset/img/RPA.png"/>
						<br>
						<h2 class="img_text3">OTHER FACILITY</h2>
					</div>
				</a>
				<?php
			}

		//	TABLET MEETING LICENSE
			if($booksyst_userid === "admin" ){
			?>
			<a href="index.php?tablet=tablet">
				<div id="right4">
					<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
					<br>
					<h2 class="img_text4">LICENSE MEETING</h2>
				</div>
			</a>
			<?php
			}
			elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid == "indah" or $booksyst_userid === "ota"){
				?>
				<a href="index.php?tablet=tablet">
					<div id="right4">
						<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
						<br>
						<h2 class="img_text4">LICENSE MEETING</h2>
					</div>
				</a>
				<?php
			}
			else{
				?>
				<a href="index.php?tablet=tablet">
					<div id="right3">
						<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
						<br>
						<h2 class="img_text4">LICENSE MEETING</h2>
					</div>
				</a>
				<?php
			}

		//	TABLET MEETING LICENSE
		if($booksyst_userid === "admin" ){
		?>
			<a href="index.php?tablet=tablet">
				<div id="right4">
					<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
					<br>
					<h2 class="img_text4">DEVICE RESERVATION</h2>
				</div>
			</a>
		<?php
		}
		elseif($booksyst_vuserctrtype == "1" or $booksyst_usertype >= "1" or $booksyst_userid == "mudasir" or $booksyst_userid == "indah" or $booksyst_userid === "ota"){
		?>
			<a href="index.php?tablet=tablet">
				<div id="right4">
					<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
					<br>
					<h2 class="img_text4">DEVICE RESERVATION</h2>
				</div>
			</a>
		<?php
		}
		else{
		?>
			<a href="index.php?tablet=tablet">
				<div id="right3">
					<img class="img_tablet" width="220px" src="asset/img/OnlineMeeting.PNG"/>
					<br>
					<h2 class="img_text4">DEVICE RESERVATION</h2>
				</div>
			</a>
			<?php
		}
		?>
			
</div>