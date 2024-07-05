<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];


    if ($email == "N1106499@ntub.edu.tw" && $password == "123456") {
        header("Location: index.html");
        exit();
    } else {
        echo "登入失敗";
    }
}
