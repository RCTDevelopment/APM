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
            $strToSearch = $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
        }

      }

      $sql = "SELECT Date, Type,Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE Equipment=".$strToSearch." AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Equipment,Date ORDER BY Date DESC,Equipment";

      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$cr]['Total_Runtime']    = $row['Total'];
            $plants[$cr]['Date']    = $row['Date'];
            $plants[$cr]['Equipment']    = $row['Equipment'];
            $cr++;
        }
      }
    }
    else if($type =='Excavator'){

      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Equipment=" . $equipments[$i];
        }

      }

      $sql = "SELECT Date, Equipment, SUM(Total_Runtime) AS Total FROM dbhm WHERE Equipment=".$strToSearch." AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') GROUP BY Equipment,Date ORDER BY Date DESC,Equipment";

      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$cr]['Total_Runtime']    = $row['Total'];
            $plants[$cr]['Date']    = $row['Date'];
            $plants[$cr]['Equipment']    = $row['Equipment'];
            $cr++;
        }
      }
    }


  $json = json_encode($plants);
  echo $json;
  exit;
