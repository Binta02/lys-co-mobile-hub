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
// $debugLog = "=== Nouveau test à " . date('Y-m-d H:i:s') . " ===\n";

// Charger PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // chemin vers Composer autoload.php
$config = require 'mail_conf.php';

// Récupérer les données envoyées
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// $debugLog .= "Données reçues:\nPrénom: $firstName\nNom: $lastName\nEmail: $email\nSujet: $subject\nMessage:\n$message\n\n";

$mail_body = "Nom: $firstName $lastName\n";
$mail_body .= "Email: $email\n\n";
$mail_body .= "Message:\n$message";

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = $config['host'];
  $mail->SMTPAuth = true;
  $mail->Username = $config['username'];
  $mail->Password = $config['password'];
  $mail->SMTPSecure = $config['encryption'];
  $mail->Port = $config['port'];

  // Expéditeur et destinataire
  $mail->setFrom($config['from_email'], $config['from_name']);
  $mail->addAddress('contact@lys-and-co.com'); // Où recevoir le mail

  // Contenu
  $mail->CharSet = 'UTF-8'; // ✅ Ajoute cette ligne
  $mail->isHTML(true);
  $mail->Subject = "Nouveau message de $firstName $lastName - Sujet: $subject";
  // $mail->Body = $mail_body;
  $mail->Body = "
  <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;'>
    <h2 style='color: #333;'>Nouveau message depuis le formulaire de contact</h2>
    <p><strong>Nom :</strong> {$firstName} {$lastName}</p>
    <p><strong>Email :</strong> <a href='mailto:{$email}'>{$email}</a></p>
    <p><strong>Sujet :</strong> {$subject}</p>
    <hr style='margin: 20px 0;'>
    <p><strong>Message :</strong></p>
    <p style='white-space: pre-line; background: #fff; padding: 10px; border-radius: 6px; border: 1px solid #ccc;'>{$message}</p>
    <hr style='margin-top: 30px;'>
    <p style='font-size: 12px; color: #888;'>Ce message vous a été envoyé via le site <strong>lys-and-co.com</strong>.</p>
  </div>
";

  // $debugLog .= "Tentative d'envoi du mail...\n";

  // Envoi
  $mail->send();
  echo 'success';
  // $debugLog .= "Mail envoyé avec succès.\n";

} catch (Exception $e) {
  echo "Erreur lors de l'envoi: {$mail->ErrorInfo}";
  // $debugLog .= "Erreur lors de l'envoi:\n" . $mail->ErrorInfo . "\n";
}

// Enregistrer tout ce qui s'est passé
// file_put_contents('debug.txt', $debugLog . "\n\n", FILE_APPEND);
?>