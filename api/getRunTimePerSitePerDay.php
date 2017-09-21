<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plant = $data->plant;

  // Get the data
  $plant = array();
  $sql = "SELECT Date,Plant,SUM(Cubes) AS totalcubes FROM dblc where Plant='".$plant."' group by Date;"

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $plant[$cr]['Cubes']    = $row['totalcubes'];
        $plant[$cr]['Date']    = $row['Date'];
        $plant[$cr]['Plant']    = $row['Plant'];
        $cr++;
    }
  }


  $json = json_encode($plant);
  echo $json;
  exit;
