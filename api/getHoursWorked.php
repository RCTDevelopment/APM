<?php
require 'connect.php';

$connect = connect();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$eq = $data->Equipment;
// Get the data
$hours = array();
$sql = "SELECT * FROM dbhm where Equipment= ". $eq." Group By Date";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);

  $cr = 1;
  while($row = mysqli_fetch_assoc($result))
  {
      $hours[$cr]['Date']    = $row['Date'];
      $hours[$cr]['Company']  = $row['Company'];
      $hours[$cr]['Total_Runtime'] = $row['Total_Runtime'];

      $cr++;
  }
}


$json = json_encode($hours);
echo $json;
exit;
