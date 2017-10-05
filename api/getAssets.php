<?php
require 'connect.php';

$connect = connect();

// Get the data
$assets = array();
$sql = "SELECT * FROM asset";

if($result = mysqli_query($connect,$sql))
{
  $count = mysqli_num_rows($result);
  $cr = 1;
  while($row = mysqli_fetch_assoc($result))
  {
    $assets[$cr]["plantno"] = $row["plantno"];
    $assets[$cr]["model"] = $row["model"];
    $assets[$cr]["description"] = $row["description"];
    $assets[$cr]["group"] = $row["group"];
    $assets[$cr]["serialno"] = $row["serialno"];
    $assets[$cr]["site"] = $row["site"];
    $assets[$cr]["purchaseDate"] = $row["purchaseDate"];
    $assets[$cr]["repairs"] = $row["repairs"];
    $cr++;
  }
}

$json = json_encode($assets);
echo $json;
exit;
