<!-- 加載評論 
<?php
//  資料庫連接 -->
// $conn = new mysqli('localhost', 'root', '', 'your_database');

// if ($conn->connect_error) {
//     die('連接失敗: ' . $conn->connect_error);
// }

// $sql = "SELECT name, comment FROM comments ORDER BY id DESC";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     while($row = $result->fetch_assoc()) {
//         echo '<div class="comment">';
//         echo '<div class="name">' . htmlspecialchars($row['name']) . '</div>';
//         echo '<div class="text">' . htmlspecialchars($row['comment']) . '</div>';
//         echo '</div>';
//     }
// } else {
//     echo '目前沒有評論。';
// }

// $conn->close();
// ?> 
