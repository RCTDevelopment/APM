<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $equipment = $data->equipment;
  $type = $data->type;
  $startDate = $data->startDate;

  // Get the data
  $plants = array();
  if($type == 'Excavator'){
    $sql = "SELECT Date,Time,Excavator,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where Excavator='".$equipment."' AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Cubes']    = $row['totalcubes'];
          $plants[$cr]['Date']    = $row['Date'];
          $plants[$cr]['Time'] = $row['Time'];
          $plants[$cr]['Equipment']    = $row['Excavator'];
          $plants[$cr]['Tons']  = $row['totalTons'];
          $cr++;
      }
    }
  }
  else if($type == 'Truck' || $type == "Trucks"){
    $sql = "SELECT Date,Time,Truck,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where Truck='".$equipment."' AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Cubes']    = $row['totalcubes'];
          $plants[$cr]['Date']    = $row['Date'];
          $plants[$cr]['Time']  = $row['Time'];
          $plants[$cr]['Equipment']    = $row['Truck'];
          $plants[$cr]['Tons'] =$row['totalTons'];
          $cr++;
      }
    }
  }
  else if($type == 'Dozer'){
    $dozerGet = "SELECT Date,Time,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime,Dozer FROM dbdc WHERE Dozer = '".$equipment."' AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";
    if($result = mysqli_query($connect,$dozerGet))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Date'] = $row['Date'];
          $plants[$cr]['Equipment'] = $row['Dozer'];
          $plants[$cr]['Time'] = $row['Time'];
          $plants[$cr]['Cubes']    = $row['TotalCubes'];
          $plants[$cr]['total_runtime'] = $row['TotalTime']/60;
          $cr++;
      }
    }
  }



  $json = json_encode($plants);
  echo $json;
  exit;
