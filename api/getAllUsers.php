<?php
require 'connect.php';

$connect = connect();

// Get the data
$users = array();
$sql = "SELECT * FROM user";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  $cr = 1;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$cr]["username"] = $row["username"];
    $users[$cr]["role"] = $row["role"];
    $users[$cr]["password"] = $row["password"];
    if($row["Plant"]){
      $users[$cr]["Plant"] = $row["Plant"];
    }
    $cr++;
  }
}

$json = json_encode($users);
echo $json;
exit;
