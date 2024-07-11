<?php
session_start();

$users = array(
    array("email" => "N1106499@ntub.edu.tw", "password" => "123456", "username" => "user1")
);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $login_successful = false;
    foreach ($users as $user) {
        if ($user["email"] == $email && $user["password"] == $password) {
            $_SESSION["username"] = $user["username"];
            $login_successful = true;
            break;
        }
    }

    if ($login_successful) {
        header("Location: productList.html");
        exit();
    } else {
        header("Location: login.html?error=login_failed");
        exit();
    }
}
?>
