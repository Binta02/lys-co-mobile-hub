<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Si c’est une requête OPTIONS (pré-vol), on répond directement
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Affichage des erreurs
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

// Charger PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Attention : chemin vers autoload.php de Composer

// Récupérer les données envoyées
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

$mail_body = "Nom: $firstName $lastName\n";
$mail_body .= "Email: $email\n\n";
$mail_body .= "Message:\n$message";

// Debug fichier local (optionnel)
file_put_contents("debug.txt", "Reçu:\n$mail_body\n", FILE_APPEND);

// Préparer l'envoi avec PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuration serveur SMTP Hostinger
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'contact@lys-and-co.com'; // Ton adresse mail complète
    $mail->Password = 'Oceanne971-'; // ⚡ Mets ici ton mot de passe d'email
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
    $mail->Port = 465;

    // Expéditeur et destinataire
    $mail->setFrom($email, "$firstName $lastName");
    $mail->addAddress('contact@lys-and-co.com'); // Où tu veux recevoir les messages

    // Contenu
    $mail->isHTML(false); // Texte brut
    $mail->Subject = "Nouveau message de $firstName $lastName - Sujet: $subject";
    $mail->Body = $mail_body;

    $mail->send();
    echo 'success';
} catch (Exception $e) {
    echo "Erreur lors de l'envoi: {$mail->ErrorInfo}";
}
?>