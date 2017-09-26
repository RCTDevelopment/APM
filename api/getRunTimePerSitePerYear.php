<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $plant = $data->plant;
  $startDate = $data->startDate;
  $endDate = $data->endDate;

  $stringToAppend = " ";

  $dozerGet = "SELECT DISTINCT(Dozer) FROM dbdc WHERE Cubes > 0 AND Plant='".$plant."'";

  if($result = mysqli_query($connect,$dozerGet))
  {
    $count = mysqli_num_rows($result);
    While($row = mysqli_fetch_assoc($result)){
      $stringToAppend = $stringToAppend . " OR Equipment = '" . $row['Dozer'] . "' ";
    }

  }

  // Get the data
  $plants = array();
  $sql = "SELECT Year_Period, Plant, SUM(Total_Runtime) AS Total FROM dbhm WHERE (Type='Excavator' ".$stringToAppend .") AND Plant = '".$plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Year_Period ORDER BY Date DESC";

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 1;
    while($row = mysqli_fetch_assoc($result))
    {
        $plants[$cr]['Total_Runtime']    = $row['Total'];
        $plants[$cr]['Date']    = $row['Year_Period'];
        $plants[$cr]['Plant']    = $row['Plant'];
        $cr++;
    }
  }


  $json = json_encode($plants);
  echo $json;
  exit;
