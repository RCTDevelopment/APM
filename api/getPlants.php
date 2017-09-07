<?php
require 'connect.php';

$connect = connect();

$request_body = file_get_contents('php://input');

// Get the data
$plants = array();
$sql = "SELECT DISTINCT(Plant) FROM dbhm";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);

  $cr = 1;
  while($row = mysqli_fetch_assoc($result))
  {
      $plants[$cr]['Plant']    = $row['Plant'];
;

      $cr++;
  }
}


$json = json_encode($plants);
echo $json;
exit;
