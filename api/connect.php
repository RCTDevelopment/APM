<?php
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER','andruco_service1');
define('DB_PASS','52txzw3fgqsq');
define('DB_NAME','andruco_online');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect))
  {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}
