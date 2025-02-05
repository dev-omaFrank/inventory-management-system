<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());
$table_name = 'brands';

if($_POST) {
	$brandName = $_POST['editBrandName'];
	$brandStatus = $_POST['editBrandStatus']; 
	$brandId = $_POST['brandId'];

	$sql = "UPDATE " . $table_name . " SET brand_name = '$brandName', brand_active = '$brandStatus' WHERE brand_id = '$brandId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while updating brands";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST