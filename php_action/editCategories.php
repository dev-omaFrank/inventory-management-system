<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$brandName = trim(htmlspecialchars($_POST['editCategoriesName']));
	$brandStatus = trim(htmlspecialchars($_POST['editCategoriesStatus'])); 
	$categoriesId = trim(htmlspecialchars($_POST['editCategoriesId']));

	$sql = "UPDATE categories SET category_name = '$brandName', category_active = '$brandStatus' WHERE category_id = '$categoriesId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while updating the categories";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST