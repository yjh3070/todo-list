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

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_POST = json_decode(file_get_contents("php://input"),true); 
    @extract($_POST);

    $query = "";
    $result_query = "";

    // processing SQL Query by type
    switch($action){
      case "add":
        $query = "INSERT INTO todo_list(id, todo) VALUES(null, \"{$todo}\");";
        $result_query = "SELECT * FROM todo_list ORDER BY id DESC;";
        break;
      case "edit":
        $query = "UPDATE todo_list SET todo = \"{$todo}\" WHERE id = {$id};";
        $result_query = "SELECT * FROM todo_list ORDER BY id DESC;";
        break;
      case "remove":
        $query = "DELETE FROM todo_list WHERE id = {$id};";
        $result_query = "SELECT * FROM todo_list ORDER BY id DESC;";
        break;
      default:
        break;
    }
    
    $result = mysqli_query($conn, $query);
    
    // output modified results
    if($result_query != ""){
      $result2 = mysqli_query($conn, $result_query);
      $count = 0 ;
      $result_array = array();

      while ($row = mysqli_fetch_row($result2)) {
        $list_array = array("id" => $row[0], "todo" => $row[1], "status" => $row[2]);
        $result_array[$count] = $list_array;
        $count++;
      }
    
      echo json_encode($result_array, JSON_UNESCAPED_UNICODE);
    }
  }

  // disconnect
  mysqli_close($conn);  
?>