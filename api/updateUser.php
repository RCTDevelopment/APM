<?php
require 'connect.php';

$connect = connect();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$username = $data->username;
$pass = $data->password;
$role = $data->role;
$plant = $data->Plant;
if($plant == 'null'){
  $sql = "UPDATE user SET password = '".$pass."', role = '".$role."' , plant = NULL where username = '".$username."'";
}
else {
  $sql = "UPDATE user SET password = '".$pass."', role = '".$role."', plant = '".$plant."' where username = '".$username."'";
}





// Get the data

if($result = mysqli_query($connect,$sql))
{

    $user["username"] = $row["username"];
    http_response_code(202);
    $json = json_encode($user);
    echo $json;

}

exit;
