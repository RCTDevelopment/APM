<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plant = $data->plant;
  $startDate = $data->startDate;
  $endDate = $data->endDate;

  $plants = array();


  $dozerGet = "SELECT Year_Period,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE Plant = '".$plant."' AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." group by Year_Period ORDER BY Year_Period DESC";
  if($result = mysqli_query($connect,$dozerGet))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $plants[$cr]['Date'] = $row['Year_Period'];
        $plants[$cr]['Cubes']    = $row['TotalCubes'];
        $plants[$cr]['total_runtime'] = $row['TotalTime']/60;
        $cr++;
    }
  }


  $json = json_encode($plants);
  echo $json;
  exit;
