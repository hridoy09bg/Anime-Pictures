<?php
header('Content-Type: application/json');
$anime_pics = array(
    "https://i.pinimg.com/564x/72/fa/62/72fa6241dba1da9bedb25a69c2332d34.jpg",
    // Add more image URLs here
);
echo json_encode(array("url" => $anime_pics[array_rand($anime_pics)]));
?>
