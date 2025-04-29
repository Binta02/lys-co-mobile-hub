<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

// Démarrer un buffer de debug
$debugLog = "=== Nouveau test à " . date('Y-m-d H:i:s') . " ===\n";

// Charger PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // chemin vers Composer autoload.php

// Récupérer les données envoyées
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

$debugLog .= "Données reçues:\nPrénom: $firstName\nNom: $lastName\nEmail: $email\nSujet: $subject\nMessage:\n$message\n\n";

$mail_body = "Nom: $firstName $lastName\n";
$mail_body .= "Email: $email\n\n";
$mail_body .= "Message:\n$message";

$mail = new PHPMailer(true);

try {
    // Configuration SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contact@lys-and-co.com'; // Ton email complet
    $mail->Password = 'Oceanne971-'; // ⚡ Mot de passe
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL/TLS
    $mail->Port = 465;

    // Expéditeur et destinataire
    $mail->setFrom('contact@lys-and-co.com', 'Site Lys & Co');
    $mail->addAddress('contact@lys-and-co.com'); // Où recevoir le mail

    // Contenu
    $mail->isHTML(false);
    $mail->Subject = "Nouveau message de $firstName $lastName - Sujet: $subject";
    $mail->Body = $mail_body;

    $debugLog .= "Tentative d'envoi du mail...\n";

    // Envoi
    $mail->send();
    echo 'success';
    $debugLog .= "Mail envoyé avec succès.\n";

} catch (Exception $e) {
    echo "Erreur lors de l'envoi: {$mail->ErrorInfo}";
    $debugLog .= "Erreur lors de l'envoi:\n" . $mail->ErrorInfo . "\n";
}

// Enregistrer tout ce qui s'est passé
file_put_contents('debug.txt', $debugLog . "\n\n", FILE_APPEND);
?>