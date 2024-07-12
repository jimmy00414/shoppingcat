<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $password = $_POST["password"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $address = $_POST["address"];


    $_SESSION['save_success'] = true;
    echo json_encode(["status" => "success"]);
    exit();
} else {
    echo json_encode(["status" => "error"]);
    exit();
}
