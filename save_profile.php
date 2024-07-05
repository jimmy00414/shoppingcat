<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 從表單接收數據
    $email = $_POST["email"];
    $password = $_POST["password"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];
    
    // 這裡你應該添加數據驗證和儲存邏輯
    // 例如，保存到數據庫
    
    // 假設儲存成功
    $_SESSION['save_success'] = true;
    echo json_encode(["status" => "success"]);
    exit();
} else {
    echo json_encode(["status" => "error"]);
    exit();
}
?>
