# Car-Selling-Website
Responsive website for a car dealership to showcase and sell vehicles.

## Dual Environment Setup

This project is configured to work in two environments:

1. **Production Environment (Netlify)**
   - Forms use Netlify Forms for handling submissions
   - Automatically detected when hosted on a Netlify domain
   - Form submissions are sent to the success.html page

2. **Local Development Environment (XAMPP)**
   - Forms use PHP scripts for handling submissions
   - Submissions are processed using AJAX without page reload
   - Responses are displayed in a popup notification

## Local Development Setup

1. **XAMPP Configuration**:
   - Make sure XAMPP is installed and running (Apache and MySQL)
   - Place the project in `C:\xampp_8.3\htdocs\car-selling-website` (or your XAMPP htdocs folder)
   - Access the site via `http://localhost/car-selling-website/`

2. **PHP Mail Configuration**:
   - For the email functionality to work locally, you need to configure XAMPP's PHP mail settings
   - Edit your `php.ini` file in the XAMPP installation directory
   - Set up SMTP settings for your email provider
   - Alternatively, use a mail testing tool like MailHog for local testing

## Branch Management Strategy

For effective development and deployment, use the following branch strategy:

1. **main Branch**
   - Production-ready code
   - Deployed to Netlify
   - Uses Netlify Forms for form handling

2. **development Branch**
   - For local development and testing
   - Uses PHP scripts for form handling
   - Test form submissions locally before merging to main

## Files Structure

- **HTML Files**:
  - `index.html` - Homepage with hero section and contact form
  - `fleet.html` - Vehicle fleet display with booking form
  - `offers.html` - Special offers with inquiry form
  - `success.html` - Success page for Netlify form submissions
  - `terms.html` - Terms and conditions page

- **PHP Scripts**:
  - `send_inquiry.php` - Handles fleet booking form submissions
  - `send_inquiry1.php` - Handles offers inquiry form submissions
  - `contact_up.php` - Handles contact form submissions from index.html

- **JavaScript**:
  - `assets/js/form-handler.js` - Manages the dual-environment form handling logic

## Form Handling

The site uses a smart environment detection system that automatically determines whether to use Netlify Forms or PHP processing:

- In production (Netlify domains), forms are submitted directly to Netlify with appropriate attributes
- In development (localhost), forms are submitted via AJAX to the corresponding PHP scripts
- The form-handler.js script manages this behavior automatically
