<?php
require 'connect.php';

$connect = connect();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$type = $data->type;
$plant = $data->plant;


// Get the data
$models = array();
$sql = "SELECT DISTINCT(model) FROM asset WHERE plantno IN (SELECT DISTINCT(REPLACE(Equipment,' ','')) from dbhm WHERE Plant = '".$plant."' AND Type='".$type."') ORDER BY model";
if($result = mysqli_query($connect,$sql)){
  $cr = 1;
  while($row = mysqli_fetch_assoc($result)){
    $models[$cr]['model'] = $row['model'];
    $cr++;
  }
}



$json = json_encode($models);
echo $json;
exit;
