<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $type = $data->type;
  $plant = $data->plant;
  $startDate = $data->startDate;

  // Get the data
  $plants = array();
  $sql = "SELECT Date,Time,Plant,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where Plant='".$plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $plants[$cr]['Cubes']    = $row['totalcubes'];
        $plants[$cr]["Time"] = $row['Time'];
        $plants[$cr]['Date']    = $row['Date'];
        $plants[$cr]['Plant']    = $row['Plant'];
        $plants[$cr]['Tons'] =$row['totalTons'];
        $cr++;
    }
  }

  $json = json_encode($plants);
  echo $json;
  exit;
