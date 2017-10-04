<?php
require 'connect.php';

$connect = connect();

//Get all data that is similar for all requests
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$typenr = $data->typenr;
$timenr = $data->timenr;
$startDate = $data->startDate;
$endDate = $data->endDate;
//initialise array
$hours = array();
$downtimes = array();


//Plant
if($typenr == 1){
  //Per day
  if($timenr == 1){
    $plant = $data->plant;
    $sql = "SELECT Date,Plant,SUM(Total_Runtime) AS tot_run FROM dbhm where Plant= '". $plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Date'];
          $hours[$cr]['Plant'] = $row["Plant"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Date,SUM(Delay) AS totalDelay FROM dbdt where Plant= '". $plant."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Date']){
          $hours[$cr]['Date'] = $row['Date'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
  //Per month
  if($timenr == 2){
    $plant = $data->plant;
    $sql = "SELECT Month_Period,Plant,SUM(Total_Runtime) AS tot_run FROM dbhm where Plant= '". $plant."' AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Month_Period ORDER BY Month_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Month_Period'];
          $hours[$cr]['Plant'] = $row["Plant"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Month_Period,SUM(Delay) AS totalDelay FROM dbdt where Plant= '". $plant."' AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Month_Period ORDER BY Month_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Month_Period'])
        {
          $hours[$cr]['Date'] = $row['Month_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
  //per year
  if($timenr == 3){
    $plant = $data->plant;
    $sql = "SELECT Year_Period,Plant,SUM(Total_Runtime) AS tot_run FROM dbhm where Plant= '". $plant."' AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Year_Period ORDER BY Year_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Year_Period'];
          $hours[$cr]['Plant'] = $row["Plant"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Year_Period,SUM(Delay) AS totalDelay FROM dbdt where Plant= '". $plant."' AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Year_Period ORDER BY Year_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Year_Period']){
          $hours[$cr]['Date'] = $row['Year_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
}
//Type
else if ($typenr == 2){
  //Per day
  if($timenr == 1){
    $type = $data->type;
    $sql = "SELECT Date,Type,SUM(Total_Runtime) AS tot_run FROM dbhm where Type= '". $type."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Date'];
          $hours[$cr]['Plant'] = $row["Type"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Date,SUM(Delay) AS totalDelay FROM dbdt where Type= '". $type."' AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Date ORDER BY Date DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Date']){
            $hours[$cr]['Date'] = $row['Date'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
  //Per month
  if($timenr == 2){
    $type = $data->type;
    $sql = "SELECT Month_Period,Type,SUM(Total_Runtime) AS tot_run FROM dbhm where Type= '". $type."' AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Month_Period ORDER BY Month_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Month_Period'];
          $hours[$cr]['Plant'] = $row["Type"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Month_Period,SUM(Delay) AS totalDelay FROM dbdt where Type= '". $type."' AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Month_Period ORDER BY Month_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Month_Period']){
          $hours[$cr]['Date'] = $row['Month_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }

  }
  //per year
  if($timenr == 3){
    $type = $data->type;
    $sql = "SELECT Year_Period,Type,SUM(Total_Runtime) AS tot_run FROM dbhm where Type= '". $type."' AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Year_Period ORDER BY Year_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Year_Period'];
          $hours[$cr]['Plant'] = $row["Type"];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];
          $cr++;
      }
    }

    $sql = "SELECT Year_Period,SUM(Delay) AS totalDelay FROM dbdt where Type= '". $type."' AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Year_Period ORDER BY Year_Period DESC";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Year_Period']){
          $hours[$cr]['Date'] = $row['Year_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
}
//Equipment
else if($typenr == 3){
  //Per day
  if($timenr == 1){
    $equipments = $data->equipments;

    $strToSearch = "";
    $length = count($equipments);
    for ($i = 0; $i < $length; $i++) {
      if($i == 0){
          $strToSearch = "Equipment =" . $equipments[$i];
      }
      else {
        $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
      }

    }

    $sql = "SELECT Date,Equipment,SUM(Total_Runtime) AS tot_run FROM dbhm where (". $strToSearch.") AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') Group By Equipment,Date ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Date'];
          $hours[$cr]['Plant']  = $row['Equipment'];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];

          $cr++;
      }
    }

    $sql = "SELECT Date,SUM(Delay) AS totalDelay FROM dbdt where (". $strToSearch.") AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Equipment,Date ORDER BY Date DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Date']){
          $hours[$cr]['Date'] = $row['Date'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }



  }
  //Per month
  if($timenr == 2){
    $equipments = $data->equipments;

    $strToSearch = "";
    $length = count($equipments);
    for ($i = 0; $i < $length; $i++) {
      if($i == 0){
          $strToSearch = "Equipment =" . $equipments[$i];
      }
      else {
        $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
      }

    }

    $sql = "SELECT Month_Period,Equipment,SUM(Total_Runtime) AS tot_run FROM dbhm where (". $strToSearch.") AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Equipment,Month_Period ORDER BY Month_Period DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Month_Period'];
          $hours[$cr]['Plant']  = $row['Equipment'];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];

          $cr++;
      }
    }

    $sql = "SELECT Month_period,SUM(Delay) AS totalDelay FROM dbdt where (". $strToSearch.") AND Month_Period <= ".$endDate." AND Month_Period >= ".$startDate." GROUP BY Equipment,Month_Period ORDER BY Month_Period DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Month_Period']){
          $hours[$cr]['Date'] = $row['Month_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
  //per year
  if($timenr == 3){
    $equipments = $data->equipments;

    $strToSearch = "";
    $length = count($equipments);
    for ($i = 0; $i < $length; $i++) {
      if($i == 0){
          $strToSearch = "Equipment =" . $equipments[$i];
      }
      else {
        $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
      }

    }

    $sql = "SELECT Year_Period,Equipment,SUM(Total_Runtime) AS tot_run FROM dbhm where (". $strToSearch.")  AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Equipment,Year_Period ORDER BY Year_Period DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $hours[$cr]['Date']    = $row['Year_Period'];
          $hours[$cr]['Plant']  = $row['Equipment'];
          $hours[$cr]['Total_Runtime'] = $row['tot_run'];

          $cr++;
      }
    }

    $sql = "SELECT Year_Period,SUM(Delay) AS totalDelay FROM dbdt where (". $strToSearch.")  AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Equipment,Year_Period ORDER BY Year_Period DESC";

    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
        if($row['Year_Period']){
          $hours[$cr]['Date'] = $row['Year_Period'];
        }
          $hours[$cr]['Delay'] = round($row['totalDelay']/60);
          $cr++;
      }
    }
  }
}

$json = json_encode($hours);
echo $json;
exit;
