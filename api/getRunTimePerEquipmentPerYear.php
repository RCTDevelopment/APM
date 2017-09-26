<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $type = $data->type;
  $equipment = $data->equipment;
  $startDate = $data->startDate;
  $endDate = $data->endDate;

  // Get the data
  $plants = array();
  if($type=='Truck' || $type == 'Trucks'){
    $sql = "SELECT Year_Period, Type,Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE Equipment='".$equipment."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Year_Period ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Total_Runtime']    = $row['Total'];
          $plants[$cr]['Date']    = $row['Year_Period'];
          $plants[$cr]['Equipment']    = $row['Equipment'];
          $cr++;
      }
    }
  }
  else if($type =='Excavator'){
    $sql = "SELECT Year_Period, Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE Equipment='".$equipment."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Year_Period ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Total_Runtime']    = $row['Total'];
          $plants[$cr]['Date']    = $row['Year_Period'];
          $plants[$cr]['Equipment']    = $row['Equipment'];
          $cr++;
      }
    }
  }



  $json = json_encode($plants);
  echo $json;
  exit;
