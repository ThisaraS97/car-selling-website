// EmailJS Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    // Replace "YOUR_USER_ID" with your actual EmailJS user ID
    emailjs.init("YOUR_USER_ID");

    // Get the contact form element
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading indicator
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value
            };
            
            // Send email using EmailJS
            // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual EmailJS service and template IDs
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
                .then(function(response) {
                    console.log("Email sent successfully", response);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    showMessage("Your message has been sent successfully! We'll contact you soon.", "success");
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    console.error("Email sending failed", error);
                    
                    // Show error message
                    showMessage("Sorry, there was a problem sending your message. Please try again later.", "error");
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Function to show message
    function showMessage(message, type) {
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = type === 'success' 
            ? 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg' 
            : 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
        messageElement.textContent = message;
        
        // Add message to the form
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
});