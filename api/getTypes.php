<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $eq = $data->plant;

  // Get the data
  $types = array();
  $sql = "SELECT DISTINCT(Type) FROM dbhm where Plant= '". $eq."'";

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $types[$cr]['type']    = $row['Type'];
        $cr++;
    }
  }


  $json = json_encode($types);
  echo $json;
  exit;
