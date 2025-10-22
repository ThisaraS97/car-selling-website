/**
 * Form Handler - Manages form submissions for both local PHP and Netlify environments
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're running in production (Netlify) or local environment
    const isProduction = window.location.hostname.includes('netlify.app') || 
                         window.location.hostname.includes('abcmotors.lk') ||
                         window.location.hostname === 'www.abcmotors.lk';
    
    // Configure forms based on environment
    const forms = document.querySelectorAll('form.form-handler');
    forms.forEach(form => {
        // Setup Netlify attributes for production
        if (isProduction) {
            form.setAttribute('data-netlify', 'true');
            form.setAttribute('netlify-honeypot', 'bot-field');
            
            // Set action to success page
            const currentAction = form.getAttribute('action');
            if (!currentAction.includes('success.html')) {
                form.setAttribute('action', '/success.html');
            }
            
            // Show Netlify fields
            const netlifyFields = form.querySelector('.netlify-fields');
            if (netlifyFields) {
                netlifyFields.classList.remove('hidden');
            }
        } else {
            // For local environment, handle form submission via AJAX to PHP
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                fetch(form.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show response in popup
                    const popupModal = document.getElementById('popupModal');
                    const popupMessage = document.getElementById('popupMessage');
                    const popupIcon = document.getElementById('popupIcon');
                    
                    if (data.success) {
                        // Success
                        popupIcon.innerHTML = '<i class="fa-solid fa-circle-check text-green-500"></i>';
                        popupMessage.textContent = data.message || 'Message sent successfully!';
                        form.reset(); // Clear form on success
                    } else {
                        // Error
                        popupIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation text-red-500"></i>';
                        popupMessage.textContent = data.message || 'Error sending message. Please try again.';
                    }
                    
                    // Show popup
                    popupModal.classList.remove('hidden');
                    popupModal.classList.add('flex');
                    
                    // Hide popup after 5 seconds
                    setTimeout(() => {
                        popupModal.classList.add('hidden');
                        popupModal.classList.remove('flex');
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show error popup
                    const popupModal = document.getElementById('popupModal');
                    const popupMessage = document.getElementById('popupMessage');
                    const popupIcon = document.getElementById('popupIcon');
                    
                    popupIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation text-red-500"></i>';
                    popupMessage.textContent = 'Network error. Please check your connection and try again.';
                    
                    popupModal.classList.remove('hidden');
                    popupModal.classList.add('flex');
                });
            });
        }
    });
    
    // Close popup modal when close button is clicked
    const popupClose = document.getElementById('popupClose');
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            const popupModal = document.getElementById('popupModal');
            popupModal.classList.add('hidden');
            popupModal.classList.remove('flex');
        });
    }
});