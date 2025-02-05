<?php 	
require_once 'core.php';
define('STATUS_AVAILABLE', 'available');
define('STATUS_UNAVAILABLE', 'unavailable');

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$brandName = $_POST['brandName'];
  	$brandactive = $_POST['brandStatus']; 
	$brandstatus = $brandactive == STATUS_UNAVAILABLE ? 1 : 0;

	$sql = "INSERT INTO brands (brand_name, brand_active, brand_status) VALUES ('$brandName', '$brandactive', '$brandstatus')";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Added";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the brands";
	}
	 

	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST