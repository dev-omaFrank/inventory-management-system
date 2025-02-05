<?php 	

require_once 'core.php';

$sql = "SELECT product_id, product_name FROM products WHERE product_status = 1 AND product_quantity > 1 AND product_active = 1";
$result = $connect->query($sql);

$data = $result->fetch_all();

$connect->close();

echo json_encode($data);