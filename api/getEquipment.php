<?php
  require 'connect.php';

  $connect = connect();


  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body);
  $type = $data->type;
  $model = $data->model;
  $plant = $data->plant;


  // Get the data
  $equipments = array();
  if($type != 'Dozer'){
    if($type == 'Truck'){
      $sql = "SELECT DISTINCT(Equipment) FROM dbhm where Plant= '". $plant."' AND (Type= 'Truck' OR Type='Trucks' OR 'TRUCKS' OR 'TRUCK') AND Replace(Equipment,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')";
      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $equipments[$cr]['equipment']    = $row['Equipment'];
            $cr++;
        }
      }
    }
    else {
      $sql = "SELECT DISTINCT(Equipment) FROM dbhm where Plant= '". $plant."' AND Type= '" . $type . "' AND Replace(Equipment,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')";
      if($result = mysqli_query($connect,$sql))
      {
        $count = mysqli_num_rows($result);

        $cr = 1;
        while($row = mysqli_fetch_assoc($result))
        {
            $equipments[$cr]['equipment']    = $row['Equipment'];
            $cr++;
        }
      }
    }

  }
  else {
    $sql = "SELECT DISTINCT(Dozer) FROM dbdc WHERE Plant = '".$plant."' AND Replace(Dozer,' ','') IN (SELECT plantno FROM asset WHERE model='".$model."')";
    if($result = mysqli_query($connect,$sql))
    {
      $count = mysqli_num_rows($result);

      $cr = 1;
      while($row = mysqli_fetch_assoc($result))
      {
          $equipments[$cr]['equipment']    = $row['Dozer'];
          $cr++;
      }
    }
  }





  $json = json_encode($equipments);
  echo $json;
  exit;
