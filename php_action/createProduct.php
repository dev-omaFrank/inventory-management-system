<?php
require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {
	$productName = trim(htmlspecialchars($_POST['productName']));
	// $productImage = trim(htmlspecialchars($_POST['productImage']));
	$quantity = trim(htmlspecialchars($_POST['quantity']));
	$rate = trim(htmlspecialchars($_POST['rate']));
	$brandName = trim(htmlspecialchars($_POST['brandName']));
	$categoryName = trim(htmlspecialchars($_POST['categoryName']));
	$productStatus = trim(htmlspecialchars($_POST['productStatus']));

	$type = explode('.', $_FILES['productImage']['name']);
	$type = $type[count($type)-1];		
	$url = '../assests/images/stock/'.uniqid(rand()).'.'.$type;
	if(in_array($type, array('gif', 'jpg', 'jpeg', 'png', 'JPG', 'GIF', 'JPEG', 'PNG'))) {
		if(is_uploaded_file($_FILES['productImage']['tmp_name'])) {			
			if(move_uploaded_file($_FILES['productImage']['tmp_name'], $url)) {
				
				$sql = "INSERT INTO products (product_name, product_image, product_brand_id, 
						product_categories_id, product_quantity, product_price, product_active, 
						product_status) 
				VALUES ('$productName', '$url', '$brandName', '$categoryName', '$quantity', '$rate', '$productStatus', 1)";

				if($connect->query($sql) === TRUE) {
					$valid['success'] = true;
					$valid['messages'] = "Successfully Added";	
				} else {
					$valid['success'] = false;
					$valid['messages'] = "Error while adding the members";
				}

			}	else {
				return false;
			}	// /else	
		} // if
	} // if in_array 		

	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST