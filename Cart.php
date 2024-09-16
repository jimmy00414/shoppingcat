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

// 假設使用者ID已經確定
$user_id = 1;

// 查詢購物車中的商品
$sql = "SELECT products.name, products.price, cart.quantity 
        FROM cart 
        JOIN products ON cart.product_id = products.id 
        WHERE cart.user_id = $user_id";
$result = $conn->query($sql);

$items = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>購物車</title>
    <!-- 這裡保留你的CSS和其他資源 -->
</head>
<body>
    <!-- 導航條保留 -->
    <div class="container">
        <h2>購物車</h2>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>商品名稱</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>小計</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($items as $item): ?>
                <tr>
                    <td><?php echo $item['name']; ?></td>
                    <td>NT$<?php echo $item['price']; ?></td>
                    <td><?php echo $item['quantity']; ?></td>
                    <td>NT$<?php echo $item['price'] * $item['quantity']; ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
