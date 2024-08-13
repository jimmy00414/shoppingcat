<!-- 添加評論 -->

<?php
// 資料庫連接
$conn = new mysqli('localhost', 'root', '', 'your_database');

if ($conn->connect_error) {
    die('連接失敗: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $comment = $_POST['comment'];

    $sql = "INSERT INTO comments (name, comment) VALUES ('$name', '$comment')";
    
    if ($conn->query($sql) === TRUE) {
        echo 'success';
    } else {
        echo '錯誤: ' . $conn->error;
    }

    $conn->close();
}
?>
