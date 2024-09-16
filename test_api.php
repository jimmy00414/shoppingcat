

<?php

//old $apiUrl = "https://example.com/api/your-endpoint";
$apiUrl = "http://localhost:8081/api/favorites";


$postData = array(
    //'key1' => 'value1',
    //'key2' => 'value2'
    'favorite_id' => '1',
    'member_id' => '1',
    'product_id' => '1',
    'add_time' => '2024-08-22T00:26:48.1118018+08:00'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// curl_setopt($ch, CURLOPT_HTTPHEADER, array(
//     'Content-Type: application/json',
//     'Authorization: Bearer your_access_token',
// ));
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    $data = json_decode($response, true);
    print_r($data);
}

curl_close($ch);
?>