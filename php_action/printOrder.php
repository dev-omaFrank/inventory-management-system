<?php
require_once 'core.php';
require '../vendor/autoload.php';

use Pino\Numera;

$numera = new Numera('');

$orderId = $_POST['orderId'];

$sql = "SELECT order_date, client_name, client_contact, sub_total_price,
 vat, total_amount_price, discount, amount_paid, amount_off, payment_place, order_id FROM orders WHERE order_id = $orderId";

$orderResult = $connect->query($sql);
$orderData = $orderResult->fetch_array();

$orderDate = $orderData[0];
$clientName = $orderData[1];
$clientContact = $orderData[2]; 
$subTotal = $orderData[3];
$vat = $orderData[4];
$totalAmount = $orderData[5]; 
$discount = $orderData[6];
$grandTotal = $orderData[7];
$paid = $orderData[8];
$due = $orderData[9];
$payment_place = $orderData[9];
$orderId = $orderData[10];
// $gstn = $orderData[11];


$orderItemSql = "SELECT order_item.product_id, order_item.rate, order_item.quantity, order_item.total,
products.product_name FROM order_item
   INNER JOIN products ON order_item.product_id = products.product_id 
 WHERE order_item.order_id = $orderId";
$orderItemResult = $connect->query($orderItemSql);

 $table = 
 '<style>
.star img {
    visibility: visible;
}</style>
<table align="center" cellpadding="0" cellspacing="0" style="width: 100%;border:1px solid black;margin-bottom: 10px;">
               <tbody>
               <tr>  
                     <td colspan="5" style="text-align:center;color: red;text-decoration: underline;    font-size: 25px;">SNOWICE FAST FOOD</td>
                  </tr>
                  <tr>
                     <td rowspan="8" colspan="2" "></td>
                     <td colspan="3" style=" text-align: right;">ORIGINAL</td>
                  </tr>
                  <tr>
                    <td colspan="3" style=" text-align: right;"></td> 
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;color: red;font-style: italic;font-weight: 600;text-decoration: underline;font-size: 25px;">SHOPPING RECEIPT</td>
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;">Orlu new Owerri Road before timber market, Orlu</td>
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;">Imo state</td>
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;">0901 514 1684</td>
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;"></td>
                  </tr>
                  <tr>
                     <td colspan="3" style=" text-align: right;color: blue;text-decoration: underline;"></td>
                  </tr>
                  <tr>
                     <td colspan="2" style="padding: 0px;vertical-align: top;border-right:1px solid black;">
                        <table align="left" cellpadding="0" cellspacing="0" style="border: thin solid black; width: 100%">
                           <tbody>
                              <tr>
                                 <td style="width: 74px;vertical-align: top;color: red;" rowspan="3">TO: </td>
                                 <td style="border-bottom-style: solid; border-bottom-width: thin; border-bottom-color: red">&nbsp;'.$clientName.'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid; border-bottom-width: thin; border-bottom-color: black">&nbsp;</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid; border-bottom-width: thin; border-bottom-color: black">&nbsp;</td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                     <td style="padding: 0px;vertical-align: top;" colspan="3">
                        <table align="left" cellpadding="0" cellspacing="0" style="width: 100%">
                           <tbody>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-top: 1px solid black;border-right: 1px solid black;color: red;">Bill No : '.$orderId.'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;border-right: 1px solid black;    color: red;">Date: '.$orderDate.'</td>
                              </tr>
                              <tr>
                                 <td style="border-bottom-style: solid;border-bottom-width: thin;border-bottom-color: black;height: 52px;border-right: 1px solid black;    color: red;"></td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td style="width: 123px;text-align: center;background-color: black;color: white;border-right: 1px solid white;border-left: 1px solid black;border-bottom: 1px solid black;-webkit-print-color-adjust: exact;">S/N<br>
               
                     </td>
                     <td style="width: 50%;text-align: center;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: white;border-bottom-color: black;color: white;background-color: black;-webkit-print-color-adjust: exact;">Description Of Goods</td>
                     <td style="width: 150px;text-align: center;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: #fff;border-bottom-color: black;background-color: black;color: white;-webkit-print-color-adjust: exact;">Qty.</td>
                     <td style="width: 150px;text-align: center;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: #fff;border-bottom-color: black;background-color: black;color: white;-webkit-print-color-adjust: exact;">Rate&nbsp; Rs.<br>
                        Ps
                     </td>
                     <td style="width: 150px;text-align: center;border-top-style: solid;border-right-style: solid;border-bottom-style: solid;border-top-width: thin;border-right-width: thin;border-bottom-width: thin;border-top-color: black;border-right-color: black;border-bottom-color: black;color: white;background-color: black;-webkit-print-color-adjust: exact;">Amount&nbsp; Rs.<br>
                        &nbsp;Ps
                     </td>
                  </tr>';
                  $x = 1;
                  $cgst = 0;
                  $igst = 0;
                  $total = $subTotal;
            while($row = $orderItemResult->fetch_array()) {       
                        
               $table .= '<tr>
                     <td style="border-left: 1px solid black;border-right: 1px solid black;height: 27px;">'.$x.'</td>
                     <td style="border-left: 1px solid black;height: 27px;">'.$row[4].'</td>
                     <td style="border-left: 1px solid black;height: 27px;">'.$row[2].'</td>
                     <td style="border-left: 1px solid black;height: 27px;">'.$row[1].'</td>
                     <td style="border-left: 1px solid black;border-right: 1px solid black;height: 27px;">'.$row[3].'</td>
                  </tr>
               ';
            $x++;
            } // /while
                $table.= '
                  <tr style="border-bottom: 1px solid black;">
                     <td style="border-left: 1px solid black;border-right: 1px solid black;height: 27px;"></td>
                     <td style="border-left: 1px solid black;height: 27px;"></td>
                     <td style="border-left: 1px solid black;height: 27px;"></td>
                     <td style="width: 149px;border-right-style: solid;border-bottom-style: solid;border-right-width: thin;border-bottom-width: thin;border-right-color: black;border-bottom-color: #000;background-color: black;color: white;padding-left: 5px;-webkit-print-color-adjust: exact;">Total</td>
                     <td style="width: 218px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-top-width: thin; border-right-width: thin; border-bottom-width: thin; border-top-color: black; border-right-color: black; border-bottom-color: black;">'.$subTotal.'</td>
                  </tr>
                  <tr>
                  <td colspan="3" style="border-bottom: 1px solid black;border-left: 1px solid black;padding: 5px;">SNOWICE FAST FOOD</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="border-bottom: 1px solid black;width: 859px;border-left: 1px solid black;padding: 5px;">Situated at Orlu, New Owerri road before timber market</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="border-left: 1px solid black; border-bottom: 1px solid black; color: red; padding: 5px;">
                           Amount in words: '.$numera->convertToWords($total).' naira only.
                     </td>
                     <td style="border-bottom: 1px solid #fff;background-color: black;color: white;padding: 5px;-webkit-print-color-adjust: exact;">G. Total</td>
                     <td style="border-bottom: 1px solid black;border-right: 1px solid;">'.$total.'</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="border-left: 1px solid black;border-bottom: 1px solid black;padding: 5px;border-right: 1px solid black;">            
                     Thanks for shopping with us...
                     </td>
                     <td rowspan="2" colspan="2" style="vertical-align: bottom;padding: 5px;color: red;border-right: 1px solid black;text-align: center;">Issued by SnowIce Fast Food</td>
                  </tr>
                  <tr>
                     <td colspan="3" style="border-left: 1px solid black;padding-left: 5px;border-right: 1px solid black;">
                        <em>See you next time...</em>
                     </td>
                  </tr>
               </tbody>
            </table>
            ';
$connect->close();

echo $table;