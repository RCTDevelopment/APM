<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $equipments = $data->equipment;
  $type = $data->type;
  $startDate = $data->startDate;
  $endDate = $data->endDate;

  // Get the data
  $plants = array();
    if($type == 'Excavator'){
      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++)
      {
        if($i == 0){
            $strToSearch = $strToSearch . $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Excavator=" . $equipments[$i];
        }
      }

      $sql = "SELECT Month_Period,Excavator,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where Excavator=".$strToSearch." AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') group by Excavator,Month_Period ORDER BY Date DESC,Excavator";

      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$cr]['Cubes']    = $row['totalcubes'];
            $plants[$cr]['Date']    = $row['Month_Period'];
            $plants[$cr]['Equipment']    = $row['Excavator'];
            $plants[$cr]['Tons']  = $row['totalTons'];
            $cr++;
        }
      }
    }
    else if($type == 'Truck'){
      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch .  " OR Truck=" . $equipments[i];
        }
      }

      $sql = "SELECT Month_Period,Truck,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where Truck=".$strToSearch." AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') group by Truck,Month_Period ORDER BY Date DESC,Truck";

      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$cr]['Cubes']    = $row['totalcubes'];
            $plants[$cr]['Equipment']    = $row['Truck'];
            $plants[$cr]['Date']    = $row['Month_Period'];
            $plants[$cr]['Tons'] =$row['totalTons'];
            $cr++;
        }
      }
    }
    else if($type == 'Dozer'){

      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch .  " OR Dozer=" . $equipments[$i];
        }
      }


      $dozerGet = "SELECT Month_Period,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime,Dozer FROM dbdc WHERE Dozer = ".$strToSearch." AND STR_TO_DATE(Date,'%Y-%m-%d') <= DATE('".$endDate."') AND STR_TO_DATE(Date,'%Y-%m-%d') >= DATE('".$startDate."') group by Dozer,Month_Period ORDER BY Date DESC,Dozer";
      if($result = mysqli_query($connect,$dozerGet))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $plants[$cr]['Date'] = $row['Month_Period'];
            $plants[$cr]['Equipment'] = $row['Dozer'];
            $plants[$cr]['Cubes']    = $row['TotalCubes'];
            $plants[$cr]['total_runtime'] = $row['TotalTime']/60;
            $cr++;
        }
      }
    }




  $json = json_encode($plants);
  echo $json;
  exit;