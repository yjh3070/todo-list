<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  header("Access-Control-Allow-Credentials: true");
  header("Content-Type: application/json");

  $host = '127.0.0.1'; // MySQL host
  $username = 'root'; // MySQL username
  $password = ''; // MySQL password
  $database = 'todo_list'; // use database name

  $conn = mysqli_connect($host, $username, $password, $database);

  if (!$conn) {
    die('MySQL 연결 실패: ' . mysqli_connect_error());
  }

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents("php://input"),true); 
    @extract($_POST);

    $status = json_encode($status);

    $query = "UPDATE todo_list SET status={$status} WHERE id={$id};";
    $result = mysqli_query($conn, $query);

    // // 결과 해제
    // mysqli_free_result($result);
  }

  // 연결 종료
  mysqli_close($conn);
?>