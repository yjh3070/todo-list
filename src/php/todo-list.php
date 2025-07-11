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
      die('MySQL connection fail: ' . mysqli_connect_error());
  }

  $query = "SELECT * FROM todo_list ORDER BY id DESC";
  $result = mysqli_query($conn, $query);
  $count = 0 ;
  $result_array = array();

  while ($row = mysqli_fetch_row($result)) {
    $list_array = array("id" => $row[0], "todo" => $row[1], "status" => $row[2]);
    $result_array[$count] = $list_array;
    $count++;
  }

  echo json_encode($result_array, JSON_UNESCAPED_UNICODE);

  // result
  mysqli_free_result($result);

  // disconnect
  mysqli_close($conn);
?>
