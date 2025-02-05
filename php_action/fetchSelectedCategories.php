<?php 	

require_once 'core.php';

$categoriesId =trim(htmlspecialchars( $_POST['categoriesId']));

$sql = "SELECT category_id, category_name, category_active, category_status FROM categories WHERE category_id = $categoriesId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);