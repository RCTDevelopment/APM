<?php
require 'connect.php';

$connect = connect();

//FIX FUCKUP HERE
//Get all data that is similar for all requests
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$timenr = $data->timenr;
$startDate = $data->startDate;
$endDate = $data->endDate;
//initialise array
$hours = array();



$model = $data->model;
$plants = $data->plant;
$strToSearch = "";
$length = count($plants);
for ($i = 0; $i < $length; $i++) {
  if($i == 0){
      $strToSearch = "Plant ='" . $plants[$i] . "'";
  }
  else {
    $strToSearch = $strToSearch . " OR Plant ='" . $plants[$i] . "'";
  }
}

$type = 'none';
$sql = "SELECT DISTINCT(asset.group) FROM asset WHERE model='".$model."'";
if($result = mysqli_query($connect,$sql)){
  $cr = 1;
  while($row = mysqli_fetch_assoc($result))
  {
      $type = $row['group'];
  }
}
if($type == 'Dozer'){
  if($timenr == 1){
    $sql = "SELECT Date,Plant,SUM(Cubes) AS totalcubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE  (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') Group by Plant,Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = round($row['totalcubes']);
        $hours[$cr]['Date']    = $row['Date'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['total_runtime'] = $row['TotalTime']/60;
        $cr++;
      }
    }

  }
  //per month
  else if ($timenr == 2) {
    $sql = "SELECT Month_Period,Plant,SUM(Cubes) AS totalcubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." Group by Plant,Month_Period ORDER BY CAST(Month_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = round($row['totalcubes']);
        $hours[$cr]['Date']    = $row['Month_Period'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['total_runtime'] = $row['TotalTime']/60;
        $cr++;
      }
    }
  }
  //per year
  else if ($timenr == 3){
    $sql = "SELECT Year_Period,Plant,SUM(Cubes) AS totalcubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." Group by Plant,Year_Period ORDER BY CAST(Year_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = round($row['totalcubes']);
        $hours[$cr]['Date']    = $row['Year_Period'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['total_runtime'] = $row['TotalTime']/60;
        $cr++;
      }
    }
  }
  else if($timenr == 4){
    $dozerGet = "SELECT Plant,Date,Time,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime FROM dbdc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Date,Time ORDER BY Date DESC";
    if($result = mysqli_query($connect,$dozerGet))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date'] = $row['Time'];
          $hours[$cr]['Time'] = $row['Time'];
          $hours[$cr]['Plant'] = $row['Plant'];
          $hours[$cr]['Cubes']    = $row['TotalCubes'];
          $hours[$cr]['total_runtime'] = $row['TotalTime']/60;
          $cr++;
      }
    }

  }
}
else {
  //per day
  if($timenr == 1){
    $sql = "SELECT Date,Plant,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') Group by Plant,Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = $row['totalcubes'];
        $hours[$cr]['Date']    = $row['Date'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['Tons'] =$row['totalTons'];
        $cr++;
      }
    }
    $sql = "SELECT Date,SUM(Total_Runtime) AS Total FROM dbhm WHERE (".$strToSearch.") AND (REPLACE(Equipment,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Plant,Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Date']){
          $hours[$cr]['Date'] = $row['Date'];
        }
        $hours[$cr]['total_runtime'] = $row['Total'];
        $cr++;
      }
    }
  }
  //per month
  else if ($timenr == 2) {
    $sql = "SELECT Month_Period,Plant,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." Group by Plant,Month_Period ORDER BY CAST(Month_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = $row['totalcubes'];
        $hours[$cr]['Date']    = $row['Month_Period'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['Tons'] =$row['totalTons'];
        $cr++;
      }
    }
    $sql = "SELECT Month_Period,SUM(Total_Runtime) AS Total FROM dbhm WHERE (".$strToSearch.") AND (REPLACE(Equipment,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Plant,Month_Period ORDER BY CAST(Month_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Month_Period']){
          $hours[$cr]['Date'] = $row['Month_Period'];
        }
        $hours[$cr]['total_runtime'] = $row['Total'];
        $cr++;
      }
    }
  }
  //per year
  else if ($timenr == 3){
    $sql = "SELECT Year_Period,Plant,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc WHERE (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." Group by Plant,Year_Period ORDER BY CAST(Year_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql)){
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        $hours[$cr]['Cubes']    = $row['totalcubes'];
        $hours[$cr]['Date']    = $row['Year_Period'];
        $hours[$cr]['Plant']    = $row['Plant'];
        $hours[$cr]['Tons'] =$row['totalTons'];
        $cr++;
      }
    }
    $sql = "SELECT Year_Period,SUM(Total_Runtime) AS Total FROM dbhm WHERE (".$strToSearch.") AND (REPLACE(Equipment,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Plant,Year_Period ORDER BY CAST(Year_Period AS UNSIGNED) DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);
      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Year_Period']){
          $hours[$cr]['Date'] = $row['Year_Period'];
        }
        $hours[$cr]['total_runtime'] = $row['Total'];
        $cr++;
      }
    }
  }
  else if($timenr == 4){
    $sql = "SELECT Date,Time,Plant,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where (".$strToSearch.") AND (REPLACE(".$type.",' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')) AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') GROUP BY Date,Time ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Cubes']    = $row['totalcubes'];
          $hours[$cr]['Date']    = $row['Time'];
          $hours[$cr]['Time'] = $row['Time'];
          $hours[$cr]['Plant']    = $row['Plant'];
          $hours[$cr]['Tons'] =$row['totalTons'];
          $cr++;
      }
    }

  }
}



$json = json_encode($hours);
echo $json;
exit;
