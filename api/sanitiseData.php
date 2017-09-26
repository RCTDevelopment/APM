<?php
  require 'connect.php';

  $connect = connect();


  $sql = "UPDATE dbhm SET EOS = BOS, Total_Runtime = 0 WHERE Total_RunTime < 0";
  //Insert data into sql
  if($result = mysqli_query($connect,$sql))
  {
      $sql = "DELETE FROM dbdc WHERE Haul_To != 'Production Dozing'";
      if($result = mysqli_query($connect,$sql))
      {
        http_response_code(200);
        echo 'success';
      }
  }




  exit;
