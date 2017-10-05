<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plantno = $data->plantno;
  $model = $data->model;
  $description = $data->description;
  $group = $data->group;
  $serialno = $data->serialno;
  $site = $data->site;
  $purchase = $data->purchaseDate;
  if($data->repairs){
      $repairs = $data->repairs;
      $sql = "INSERT INTO asset VALUES('".$plantno."','".$model."','".$description."','".$group."','".$serialno."','".$site."','0','".$purchase."','".$repairs."')";
  }

  //Insert data into sql
  if($result = mysqli_query($connect,$sql))
  {
      http_response_code(200);
      $json = json_encode($plantno);
      echo $json;
  }
  exit;
