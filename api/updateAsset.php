<?php
require 'connect.php';

$connect = connect();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$plantno = $data->plantno;
$model = $data->model;
$description = $data->description;
$group = $data->group;
$serialno = $data->serialno;
$site = $data->site;
$purchase = $data->purchaseDate;
$repairs = $data->repairs;

$sql = "UPDATE asset SET model ='".$model."',description = '".$description."', asset.group= '".$group."', serialno= '".$serialno."' , site= '".$site."', MachineHours = '0', purchaseDate= '".$purchase."', repairs= '".$repairs."'   where plantno = '".$plantno."'";






// Get the data

if($result = mysqli_query($connect,$sql))
{

    http_response_code(202);
    $json = json_encode($plantno);
    echo $json;

}

exit;
