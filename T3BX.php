<?php
// 連接到資料庫
$host = 'localhost';
$db = 'your_database';
$user = 'your_username';
$pass = 'your_password';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("連接失敗: " . $conn->connect_error);
}

// 查詢產品信息
$product_id = 1; // 假設這是產品ID
$sql = "SELECT name, price, description FROM products WHERE id = $product_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $product_name = $row['name'];
    $product_price = $row['price'];
    $product_description = $row['description'];
} else {
    // 設定預設值
    $product_name = "產品名稱";
    $product_price = 0;
    $product_description = "產品描述";
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $product_name; ?></title>
    <!-- 這裡保留你的CSS和其他資源 -->
</head>
<body>
    <!-- 導航條保留 -->
    <div class="container">
        <h2><?php echo $product_name; ?></h2>
        <p><?php echo $product_description; ?></p>
        <div>價格: NT$<?php echo $product_price; ?></div>
    </div>
</body>
</html>
