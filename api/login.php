<?php
require 'connect.php';

$connect = connect();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$eq = $data->username;
$pass = $data->password;

// Get the data
$user = array();
$sql = "SELECT * FROM user where username= '". $eq."' AND password= '".$pass."'";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  if($count == 0){
    http_response_code(401);
    $response['status'] = "error";
  }
  else {
    while($row = mysqli_fetch_assoc($result))
    {
        if($row['password'] == $pass){
          $user["username"] = $row["username"];
        }
    }

    http_response_code(200);
    $json = json_encode($user);
    echo $json;
  }
}


exit;
