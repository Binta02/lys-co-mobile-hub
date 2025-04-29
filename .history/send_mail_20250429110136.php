<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Si c’est une requête OPTIONS (pré-vol), on répond directement
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

// Récupérer les données envoyées depuis le formulaire
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';
echo "Données reçues:\n";
echo "Prénom: $firstName\n";
echo "Nom: $lastName\n";
echo "Email: $email\n";
echo "Sujet: $subject\n";
echo "Message: $message\n\n";

// Adresse de destination
$to = 'contact@lys-and-co.com';

// Sujet du mail
$mail_subject = "Nouveau message de $firstName $lastName - Sujet: $subject";

// Corps du mail
$mail_body = "Nom: $firstName $lastName\n";
$mail_body .= "Email: $email\n\n";
$mail_body .= "Message:\n$message";

// Headers (important pour bien recevoir)
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// Envoyer l'email
if (mail($to, $mail_subject, $mail_body, $headers)) {
    echo 'success';
} else {
    echo "Erreur lors de l'envoi du mail.\n";
    echo "Sujet : $mail_subject\n";
    echo "Destinataire : $to\n";
    echo "Headers : $headers\n";
    echo "Corps : $mail_body\n";
    echo "error";
}
file_put_contents("debug.txt", "Reçu: $mail_body", FILE_APPEND);

?>