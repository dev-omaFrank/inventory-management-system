<?php 	

$localhost = "localhost";
$username = "root";
$password = "";



// server connection
$connect = new mysqli($localhost, $username, $password);

// check connection
if($connect->connect_error) {
  die("Connection Failed : " . $connect->connect_error);
} else {
  // echo "Successfully connected";
}

//vreate database
$db = 'store';
$sql = 'CREATE DATABASE IF NOT EXISTS ' . $db;
if ($connect->query($sql) == TRUE) {
  // echo 'database created successfully';
}else{
  echo json_encode(array("error" => 'There was an error creating the database.'));              
}


//db connection
$connect = new mysqli($localhost, $username, $password, $db);

function create_brand_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `brand_id` int(11) unsigned NOT NULL auto_increment,
  `brand_name` varchar(255) NOT NULL,
  `brand_active` varchar(255) NOT NULL,
  `brand_status` int(11),
  `date_added` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`brand_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function create_category_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `category_id` int(11) unsigned NOT NULL auto_increment,
  `category_name` varchar(255) NOT NULL,
  `category_active` varchar(255) NOT NULL,
  `category_status` int(11),
  `date_added` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`category_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function create_product_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `product_id` int(11) unsigned NOT NULL auto_increment,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_brand_id` varchar(255) NOT NULL,
  `product_categories_id` varchar(255) NOT NULL,
  `product_quantity` varchar(255) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `product_active` varchar(255) NOT NULL,
  `product_status` int(11),
  `date_added` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`product_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function create_orders_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `order_id` int(11) unsigned NOT NULL auto_increment,
  `client_name` varchar(255) NOT NULL,
  `client_contact` varchar(255) NOT NULL,
  `sub_total_price` varchar(255) NOT NULL,
  `vat` varchar(255) NOT NULL,
  `total_quantity` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `total_amount_price` varchar(255) NOT NULL,
  `amount_paid` varchar(255) NOT NULL,
  `amount_off` varchar(30) NOT NULL,
  `payment_status` int(11) NOT NULL,
  `payment_place` varchar(255) NOT NULL,
  `payment_type` int(11) NOT NULL, 
  `order_status` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `order_date` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`order_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function create_order_item_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `order_item_id` int(11) unsigned NOT NULL auto_increment,
  `order_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `discount` varchar(255) NOT NULL,
  `order_item_status` varchar(255) NOT NULL,
  PRIMARY KEY(`order_item_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function create_users_table($connect, $table) {
  $sql = "CREATE TABLE IF NOT EXISTS `$table` (
  `user_id` int(11) unsigned NOT NULL auto_increment,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY(`user_id`)
  )";

  if ($connect->query($sql) == FALSE) {
    echo json_encode(array("error"=> 'Error encountered: ' . $connect->error_get_last));
  }
}

function sanitizeInput($data) {
  $data = stripslashes($data);
  $data = trim($data);
  $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
  return $data;
}
?>