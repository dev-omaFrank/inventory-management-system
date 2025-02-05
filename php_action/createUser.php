<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$userName 		= $_POST['userName'];
  $upassword 			= md5($_POST['upassword']);
  $ustatus 			= $_POST['ustatus'];

	
				$sql = "INSERT INTO users (username, password, status) 
				VALUES ('$userName', '$upassword' , '$ustatus')";
				if($connect->query($sql) === TRUE) {
					$valid['success'] = true;
					$valid['messages'] = "Successfully Added";	
				} else {
					$valid['success'] = false;
					$valid['messages'] = "Error while adding the members";
				}

				// /else	
		
	} // if in_array 		

	$connect->close();

	echo json_encode($valid);
 
