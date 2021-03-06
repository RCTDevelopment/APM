<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plant = $data->plant;
  $startDate = $data->startDate;

  $plants = array();


  $dozerGet = "SELECT Date,Time,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE Plant = '".$plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";
  if($result = mysqli_query($connect,$dozerGet))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $plants[$cr]['Date'] = $row['Date'];
        $plants[$cr]['Time'] = $row['Time'];
        $plants[$cr]['Cubes']    = $row['TotalCubes'];
        $plants[$cr]['total_runtime'] = $row['TotalTime']/60;
        $cr++;
    }
  }


  $json = json_encode($plants);
  echo $json;
  exit;
