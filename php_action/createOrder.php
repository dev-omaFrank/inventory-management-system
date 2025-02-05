	<?php 	
//ALTER TABLE `orders` ADD `payment_place` INT NOT NULL AFTER `payment_status`;
//TER TABLE `orders` ADD `gstn` VARCHAR(255) NOT NULL AFTER `payment_place`;
require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array(), 'order_id' => '');
// print_r($valid);
if($_POST) {	
	// var_dump($_POST); confirm tha produc name is sent, add it to variables, pass the data to database.
	$orderDate = date('Y-m-d', strtotime(sanitizeInput($_POST['orderDate'])));
	$clientName = sanitizeInput($_POST['clientName']);
	$clientContact = sanitizeInput($_POST['clientContact']);
	$subTotalValue = sanitizeInput($_POST['subTotalValue']);
	$totalAmountValue = sanitizeInput($_POST['totalAmountValue']);
	$discount = sanitizeInput($_POST['discount']);
	$grandTotalValue = sanitizeInput($_POST['grandTotalValue']);
	$paid = sanitizeInput($_POST['paid']);
	$dueValue = sanitizeInput($_POST['dueValue']);
	$paymentType = sanitizeInput($_POST['paymentType']);
	$paymentStatus = sanitizeInput($_POST['paymentStatus']);
	$paymentPlace = sanitizeInput($_POST['paymentPlace']);
	$userid = $_SESSION['userId']; 

				
	$sql = "INSERT INTO orders 
			(order_date, client_name, client_contact, sub_total_price, total_quantity, discount, total_amount_price, amount_paid, amount_off, payment_type, payment_status,payment_place,order_status,user_id) 
			VALUES ('$orderDate', '$clientName', '$clientContact', '$subTotalValue', '$totalAmountValue', '$discount', '$grandTotalValue', '$paid', '$dueValue', $paymentType, $paymentStatus,$paymentPlace, 1,$userid)";
	
	$order_id;
	$orderStatus = false;
	if($connect->query($sql) === true) {
		$order_id = $connect->insert_id;
		$valid['order_id'] = $order_id;	

		$orderStatus = true;
	}

		
	// echo $_POST['productName'];
	$orderItemStatus = false;

	for($x = 0; $x < count($_POST['productName']); $x++) {			
		$updateProductQuantitySql = "SELECT products.product_quantity FROM products WHERE products.product_id = ".$_POST['productName'][$x]."";
		$updateProductQuantityData = $connect->query($updateProductQuantitySql);
		
		
		while ($updateProductQuantityResult = $updateProductQuantityData->fetch_row()) {
			$updateQuantity[$x] = $updateProductQuantityResult[0] - $_POST['quantity'][$x];							
				// update product table
				$updateProductTable = "UPDATE products SET product_quantity = '".$updateQuantity[$x]."' WHERE product_id = ".$_POST['productName'][$x]."";
				$connect->query($updateProductTable);

				// add into order_item
				$orderItemSql = "INSERT INTO order_item (order_id, product_id, quantity, rate, total, order_item_status) 
				VALUES ('$order_id', '".$_POST['productName'][$x]."', '".$_POST['quantity'][$x]."', '".$_POST['rateValue'][$x]."', '".$_POST['totalValue'][$x]."', 1)";

				$connect->query($orderItemSql);		

				if($x == count($_POST['productName'])) {
					$orderItemStatus = true;
				}		
		} // while	
	} // /for quantity

	$valid['success'] = true;
	$valid['messages'] = "Successfully Added";		

	$connect->close();
	echo json_encode($valid);
    exit; 
 
} // /if $_POST
// echo json_encode($valid);