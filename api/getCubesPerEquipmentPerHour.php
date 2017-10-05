<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $equipments = $data->equipment;
  $type = $data->type;
  $startDate = substr($data->startDate,0,10);

  // Get the data
  $plants = array();



    if($type == 'Excavator'){

      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++)
      {
        if($i == 0){
            $strToSearch = "Excavator = " . $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch . " OR Excavator=" . $equipments[$i];
        }

      }

      $sql = "SELECT Date,Time,Excavator,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where (".$strToSearch.") AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Time ORDER BY Time,Excavator";

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
      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = "Truck = ". $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch .  " OR Truck=" . $equipments[$i];
        }

      }

      $sql = "SELECT Date,Time,Truck,SUM(Cubes) AS totalcubes,SUM(Estimated_Tons) AS totalTons FROM dblc where (".$strToSearch.") AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Truck,Time ORDER BY Time,Truck";

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
      $strToSearch = "";
      $length = count($equipments);
      for ($i = 0; $i < $length; $i++) {
        if($i == 0){
            $strToSearch = "Dozer = " . $equipments[$i];
        }
        else {
          $strToSearch = $strToSearch .  " OR Dozer=" . $equipments[$i];
        }

      }

      $dozerGet = "SELECT Date,Time,SUM(Cubes) AS TotalCubes,SUM(Dozing_Time) AS TotalTime,Dozer FROM dbdc WHERE (".$strToSearch.") AND STR_TO_DATE(Date,'%Y-%m-%d') = DATE('".$startDate."') group by Dozer,Time ORDER BY Time,Dozer";
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
