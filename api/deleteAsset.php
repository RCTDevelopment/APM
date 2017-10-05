<?php
  require 'connect.php';

  $connect = connect();
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plantno = $data->plantno;

  $sql = "DELETE FROM asset WHERE plantno = '".$plantno."'";
  //Insert data into sql
  if($result = mysqli_query($connect,$sql))
  {
      http_response_code(200);
      echo 'sucess';
  }
  exit;
