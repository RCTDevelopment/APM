<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $type = $data->type;
  $equipments = $data->equipment;
  $startDate = $data->startDate;
  $endDate = $data->endDate;

  // Get the data
  $plants = array();
    if($type=='Truck' || $type == 'Trucks'){


      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = "Equipment = " . $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
        }

      }
      $sql = "SELECT Year_Period, Type,Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE (".$strToSearch.") AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Equipment,Year_Period ORDER BY Year_Period DESC,Equipment";

      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$ce][$cr]['Total_Runtime']    = $row['Total'];
            $plants[$ce][$cr]['Date']    = $row['Year_Period'];
            $plants[$ce][$cr]['Equipment']    = $row['Equipment'];
            $cr++;
        }
      }
    }
    else if($type =='Excavator'){
      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = "Equipment = " . $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
        }
      }

      $sql = "SELECT Year_Period, Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE (".$strToSearch.") AND Year_Period <= ".$endDate." AND Year_Period >= ".$startDate." GROUP BY Equipment,Year_Period ORDER BY Date DESC,Equipment";

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
