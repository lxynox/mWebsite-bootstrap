<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Contact me</title>
		<!-- declare the charset to support chn output-->
		<meta charset="UTF-8">  
		<!-- img icon in title -->
		<link rel="shortcut icon" href="../images/title_icon.jpg" type="image/x-icon"/>
		<link href="contact.css" rel="stylesheet">
		<script src="../script/index.js"></script>	
		<script src="//code.jquery.com/jquery-1.10.2.js"></script>
   		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>--> 		
		<script type="text/javascript" src="http://www.wufangbo.com/demo/jquery-1.4.4.min.js"></script>
	</head>
	
	<body>
<!-- left navi bar -->	
		<div id="left_side">
			<header>
				<h1 id="home">HOME</h1>	
				<nav class="tags">
					<dl>
						<dt><a href="../index.html">About Me</a></dt>
						<dt style="background-color: #750F19"><a href="">Contact</a></dt>
						<dt><a href="../software/software.html">Software Engineering</a></dt>
						<dt><a href="../android/android.html">Android</a></dt>
						<dt><a href="../resume/resume.htm">Resume</a></dt>  
					</dl>
				</nav>
			</header>
			<p>I am <b>Xuanyu Li</b>.</p> 
			<p>I'm currently working on the field of <strong>Software Engineering</strong> (J2EE && Android developer).</p>
			<p>I'm a big fan of software and technology and their magical power that changes people's lives.</p>
			<div class="head_image">
		  	<img src="../images/me.jpg" alt="images/me.png" width="200" height="200">	
			</div>
			<p>I could be reached at <span><i><a href="mailto:xli6@wpi.edu">xli6@wpi.edu</a></i></span></p>
		</div> 

<!-- right content section -->
		<div id="right_side">
			<div id="contact_nav">
				<ul>
					<li style="background-color:#750F19" 
						id="comments_leave_nav">Leave Comments</li>
					<li id="comments_view_nav">View Comments</li>
				</ul>
			</div>
<!-- comments container -->
<?php
	// define variables and set to empty values
	$name = $email = $message = $subject = "";// user input names 
	$name_err = $email_err = $message_err = $subject_err = "";

	if ($_SERVER["REQUEST_METHOD"] == "GET") {
	  // $name = test_input($_GET["username"]);
	  // $password = test_input($_GET["password"]);
		// check whether name && password are empty
	  if (empty($_GET['name'])) {
	  	$name_err = "name is required";
	  } else {
	  	$name = test_input($_GET['name']);
	  }

	  if (empty($_GET['email'])) {
	  	$email_err = "email is required";
	  } else {
	  	$email = test_input($_GET['email']);
	  }

	   if (empty($_GET['message'])) {
	  	$message_err = "message is required";
	  } else {
	  	$message = test_input($_GET['message']);
	  }

	   if (empty($_GET['subject'])) {
	  	$subject_err = "subject is required";
	  } else {
	  	$subject = test_input($_GET['subject']);
	  }
	}
	// function to process non-empty user input from the client side return cleaned data to the server side 
	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}

	/* database connection */ 
	$servername = "127.0.0.1";
	//TODO: CHANGE THE COMMENTS AFTER MOVING TO THE REAL SERVER
	$username = "lxywpiren";
	$password = "lxyWPI920817";
	$dbname = "mWebsite";
	// $username = "root";
	// $password = "lxyWPI920817";
	// $dbname = "mDatabase";
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	// echo "<p>Connected successfully</p>";

	// SECOND: retrieve all comments from table 
	$sql = "SELECT * FROM Contact";
	$result = $conn->query($sql);

	// INSERT NEW RECORDS: only when new comments submitted 
	if (strlen($name)>0 && strlen($email)>0 && strlen($message)>0 && strlen($subject)>0) {
		// FIRST: sql to insert values into table
		$sql = "INSERT INTO Contact (name, email, message, subject) values (
			'".$name."',
			'".$email."',
			'".$message."',
			'".$subject."')";

		if ($conn->query($sql) === TRUE) {
		    // echo "<p>new records inserted successfully</p>";
		} else {
		    // echo "<p>Error creating table: </p>" . $conn->error;
		}

	}
	// FINALLY : close the file always after use
	$conn->close(); 
?>
			<div id="comments_leave_container" class="selector">
				<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="get" class="basic-grey">
					<h1>Contact Form
						<span>Please fill all the texts in the fields.</span>
					</h1>
					<label>
						<span>Your Name :</span>
						<input id="name" type="text" name="name" placeholder="Your Full Name" />
					</label>
					<label>
						<span>Your Email :</span>
						<input id="email" type="email" name="email" placeholder="Valid Email Address" />
					</label>
					<label>
						<span>Message :</span>
						<textarea id="message" name="message" placeholder="Your Message"></textarea>
					</label>
					<label>
						<span>Subject :</span>
						<select name="subject">
							<option value="Advice">Advice</option>
							<option value="Job Inquiry">Job Inquiry</option>
							<option value="No Subject">No Subject</option>
						</select>
					</label>
					<label>
						<span>&nbsp;</span>
						<input type="submit" class="button" value="Send" />
					</label>
				</form>
			</div>

			<div id="comments_view_container" class="selector">
				<h3>Comments</h3>
				<!-- div to display the contacts -->
<?php
			$i = 0; 
			while ($row = $result->fetch_assoc()) {
				if ($i == 5) {
?>
					<p id="view_more_hinter" onclick="showMore()"> View More Comments </p>
<?php	
				}
?>
				<div id="comment_container<?php echo($i+1)?>" class="comment_containers" 
					style="border-bottom: solid lightgrey 1px">
					<table>
						<tr>
							<td style="border-left-width:0"><?php echo $row['name']; ?></td>
							<td><?php echo $row['email']; ?></td>
							<td><?php echo $row['subject']; ?></td>
							<td><?php echo $row['time']; ?></td>
						</tr>
					</table>
					<p id="comment_message"><?php echo $row['message'] ?>
						<span style="float:right; margin-right: 50px"><Strong>floor <?php echo ($i+1); ?></Strong>
						</span>
					</p>
				</div>
<?php 
				$i++;
				}
				if ($i > 5) {
?>
				 <p id="collapse_hinter" onclick="collapse()"> Collapse Comments </p>
<?php
				}
 ?>
			</div>
		</div>

		<!-- empty div for spacing -->
		<div style="clear:both;height:50px"></div>
<!-- bottom div -->
		<div id="footer">
			<p id="copyright"></p>
		</div>

	<script type="text/javascript" src="contact.js"></script>
	<script type="text/javascript" src="../script/addLoadEvent.js"></script>
	<script type="text/javascript">
		/* folder and unfolder the comments block */
		function collapse() {
			document.getElementById("collapse_hinter").style.display = "none";
			document.getElementById("view_more_hinter").style.display = "block";
			// hide comments after the first 5 comments
			for (var j=<?php echo $i; ?>; j>5; j--) {
				document.getElementById("comment_container"+j).style.display = "none";
			}
		}	
		function showMore() {
			document.getElementById("collapse_hinter").style.display = "block";
			document.getElementById("view_more_hinter").style.display = "none";
			// display all comments
			for (var j=<?php echo $i; ?>; j>5 ; j--) {
				document.getElementById("comment_container"+j).style.display = "block";
			}
		}
		collapse();
	</script>
	</body>
</html>