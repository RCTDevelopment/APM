<?php
require 'connect.php';

$connect = connect();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$eq = $data->username;

// Get the data
$sql = "SELECT * FROM user where username= '". $eq."'";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
    $user["username"] = $row["username"];
    $user["role"] = $row["role"];
    if($row["Plant"]){
      $user["Plant"] = $row["Plant"];
    }
  }
}

$json = json_encode($user);
echo $json;
exit;
