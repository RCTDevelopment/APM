<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $type = $data->type;
  $plant = $data->plant;

  // Get the data
  $equipments = array();
  $sql = "SELECT DISTINCT(Equipment) FROM dbhm where Plant= '". $plant."' AND Type= '" . $type . "'";

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $equipments[$cr]['equipment']    = $row['Equipment'];
        $cr++;
    }
  }


  $json = json_encode($equipments);
  echo $json;
  exit;
