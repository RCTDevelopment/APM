<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $username = $data->username;
  $pass = $data->password;
  $role = $data->role;
  if($data->plant){
      $plant = $data->plant;
      $sql = "INSERT INTO user VALUES(DEFAULT,'".$username."','".$pass."','".$role."','".$plant."')";
  }
  else {
    $sql = "INSERT INTO user VALUES(DEFAULT,'".$username."','".$pass."','".$role."',DEFAULT)";
  }

  //Insert data into sql
  if($result = mysqli_query($connect,$sql))
  {
      http_response_code(200);
      $json = json_encode($user);
      echo $json;
  }
  exit;
