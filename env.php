<?php
header('Content-Type: application/json');

$env = [
    "EMAILJS_PUBLIC_KEY" => getenv("EMAILJS_PUBLIC_KEY"),
    "EMAILJS_SERVICE_ID" => getenv("EMAILJS_SERVICE_ID"),
    "EMAILJS_TEMPLATE_ID_CONTACT" => getenv("EMAILJS_TEMPLATE_ID_CONTACT"),
    "EMAILJS_TEMPLATE_ID_APPOINTMENT" => getenv("EMAILJS_TEMPLATE_ID_APPOINTMENT")
];

echo json_encode($env);
?>
