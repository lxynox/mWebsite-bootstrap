<!DOCTYPE html>
<html lang="en">
<head>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    table, td, th {
        border: 1px solid black;
        padding: 5px;
    }

    th {text-align: left;}
</style>
</head>

<body>

<?php
// define variables and set to empty values
    $name = $email = $message = $subject = "";// user input names 
    $name_err = $email_err = $message_err = $subject_err = "";

    if ($_SERVER["REQUEST_METHOD"] == "GET") {
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
    // $username = "lxywpiren";
    // $password = "lxyWPI920817";
    // $dbname = "mWebsite";
    $username = "root";
    $password = "lxyWPI920817";
    $dbname = "mDatabase";
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "<p>Connected successfully</p>";

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
            echo "<p>new records inserted successfully</p>";
        } else {
            echo "<p>Error creating table: </p>" . $conn->error;
        }
    }

    echo "<table>
    <tr>
    <th>Name</th>
    <th>E-mail</th>
    <th>Message</th>
    <th>Subject</th>
    <th>Date</th>
    </tr>";
    while($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['name'] . "</td>";
        echo "<td>" . $row['email'] . "</td>";
        echo "<td>" . $row['message'] . "</td>";
        echo "<td>" . $row['subject'] . "</td>";
        echo "<td>" . $row['time'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    // FINALLY : close the file always after use
    $conn->close(); 
    // mysqli_close($con);
?>
</body>
</html>