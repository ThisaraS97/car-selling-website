<?php
// Send_inquiry1.php - For handling offer inquiries

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Helper to get POST safely
function get_post($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

// Collect fields
$name = strip_tags(get_post('name'));
$email = filter_var(get_post('email'), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(get_post('phone'));
$subject = strip_tags(get_post('subject'));
$message = strip_tags(get_post('message'));

// Basic validation
$errors = [];
if (!$name) $errors[] = 'Name is required.';
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Valid email is required.';
if (!$message) $errors[] = 'Message is required.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// Prepare email
$to = 'info@abcmotors.lk'; // replace with destination email
$subject = "Special Offer Inquiry: " . ($subject ? $subject : 'General Inquiry');
$body  = "You have received a new offer inquiry from your website.\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n";

// Headers
$headers = "From: {$name} <{$email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Try to send
$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Inquiry sent successfully.']);
    exit;
} else {
    // If mail() fails, return error. On local dev you may need to configure SMTP (XAMPP).
    echo json_encode(['success' => false, 'message' => 'Unable to send email. Please check your XAMPP mail configuration.']);
    exit;
}
?>