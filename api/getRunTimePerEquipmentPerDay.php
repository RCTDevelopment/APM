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
  if($type=='Truck'){
    $sql = "SELECT Date, Type, SUM(Total_Runtime) AS Total FROM dbhm WHERE Truck='".$equipment."' AND Plant = '".$plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Total_Runtime']    = $row['Total'];
          $plants[$cr]['Date']    = $row['Date'];
          $plants[$cr]['Equipment']    = $row['Truck'];
          $cr++;
      }
    }
  }
  else if($type =='Excavator'){
    $sql = "SELECT Date, Excavator, SUM(Total_Runtime) AS Total FROM dbhm WHERE Excavator='".$equipment."' AND Plant = '".$plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $plants[$cr]['Total_Runtime']    = $row['Total'];
          $plants[$cr]['Date']    = $row['Date'];
          $plants[$cr]['Equipment']    = $row['Excavator'];
          $cr++;
      }
    }
  }



  $json = json_encode($plants);
  echo $json;
  exit;
