<?php
// Récupérer les données envoyées depuis le formulaire
$firstName = $_POST['firstName'] ?? '';
$lastName = $_POST['lastName'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

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
    echo 'error';
}
?>
