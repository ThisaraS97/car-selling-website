<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Recipient email (your email)
    $to = "thisarashaminda197@gmail.com";

    // Email body (HTML)
    $body = "
    <html>
    <head>
        <title>New Inquiry</title>
    </head>
    <body>
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong> $message</p>
    </body>
    </html>
    ";

    // Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $name <$email>" . "\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('✅ Inquiry sent successfully!'); window.location='index.html';</script>";
    } else {
        echo "<script>alert('❌ Failed to send inquiry. Please try again.'); window.location='index.html';</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
