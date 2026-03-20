<?php
// Script de traitement complet pour le formulaire de contact

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sécurisation basique des données
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST["phone"]) ? filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING) : "";
    $subject_form = isset($_POST["subject"]) ? filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING) : "Nouveau contact";
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Formulaire invalide. Veuillez vérifier vos informations.'); window.history.back();</script>";
        exit;
    }

    // Email de destination
    $recipient = "contact@votre-domaine.com";
    $subject = "Portfolio : $subject_form (de $name)";
    
    // Contenu formaté
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Téléphone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // En-têtes emails
    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    
    // Envoi de l'email (désactivé localement par défaut dans xampp sans config smtp)
    // mail($recipient, $subject, $email_content, $email_headers);

    // Retour succès factice pour démo
    echo "<script>
        alert('Merci $name, votre message a bien été pris en compte en local ! (Simulation d\'envoi)');
        window.location.href = 'index.html';
    </script>";

} else {
    // Si la requête n'est pas POST, on redirige
    header("Location: index.html");
    exit;
}
?>
