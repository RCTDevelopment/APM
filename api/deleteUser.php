<?php
  require 'connect.php';

  $connect = connect();
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $username = $data->username;

  $sql = "DELETE FROM user WHERE username = '".$username."'";
  //Insert data into sql
  if($result = mysqli_query($connect,$sql))
  {
      http_response_code(200);
      echo 'sucess';
  }
  exit;
