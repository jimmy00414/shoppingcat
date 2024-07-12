<?php
// orders.php
$orders = [
  ["id" => 1, "name" => "商品A", "price" => 100, "quantity" => 2, "status" => "已出貨", "payment" => "已付款"],
  ["id" => 2, "name" => "商品B", "price" => 200, "quantity" => 1, "status" => "未出貨", "payment" => "未付款"],
];

header('Content-Type: application/json');
echo json_encode($orders);
