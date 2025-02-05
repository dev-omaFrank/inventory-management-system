<?php 	

require_once 'core.php';


$productId = trim(htmlspecialchars($_POST['productId']));

$sql = "SELECT product_id, product_name, product_image, product_brand_id, product_categories_id, product_quantity, product_price, product_active, product_status FROM products WHERE product_id = $productId AND product_quantity > 0";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);
?>