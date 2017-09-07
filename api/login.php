<?php
require 'connect.php';

$connect = connect();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$eq = $data->username;
$pass = $data->password;

// Get the data
$user = array();
$sql = "SELECT * FROM user where username= '". $eq."'";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  while($row = mysqli_fetch_assoc($result))
  {
      if($row['hashedPassword'] == $pass){
        $user["username"] = $row["username"];
      }
  }
}


$json = json_encode($user);
echo $json;
exit;
