# Digital Business Card

A clean, responsive digital business card with vCard export and contact sharing capabilities.

## Features

- Responsive design that works on all devices
- Direct contact saving to device's address book
- Contact sharing form with email integration
- Google Tag Manager integration for analytics
- QR code generation for easy sharing

## File Structure

```
digital-business-card/
├── index.html           # Main HTML structure
├── styles.css           # Styling and layout
├── script.js            # JavaScript functionality
├── contact-data.json    # Your contact information 
└── README.md            # This file
```

## Setup Instructions

### 1. Basic Setup

1. Download all files to your computer
2. Edit `contact-data.json` with your information
3. Upload all files to your web hosting (e.g., Cloudflare Pages)

### 2. Configure Your Contact Data

Edit `contact-data.json` with your personal information:

```json
{
  "name": "Your Name (Nickname)",
  "title": "Your Job Title | Additional Information",
  "company": "Your Company",
  "education": "Your Education Information",
  "email": "your-email@example.com",
  "phone": "+1 234-567-8900",
  "website": "https://yourwebsite.com",
  "instagram": "@yourhandle",
  "instagram_url": "https://instagram.com/yourhandle",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "twitter": "@yourhandle",
  "twitter_url": "https://twitter.com/yourhandle",
  "facebook": "https://facebook.com/yourprofile",
  "github": "https://github.com/yourusername",
  "profileImage": "your-photo.jpg"
}
```

### 3. Add Your Profile Photo

#### Option 1: Local Image
1. Upload your profile photo to your server along with the other files
2. Set "profileImage" to the filename (e.g., "your-photo.jpg")

#### Option 2: External Image
1. Upload your image to an image hosting service
2. Set "profileImage" to the full URL of your image

### 4. Google Tag Manager Setup (Optional)

For tracking analytics:

1. Create a Google Tag Manager account
2. In the `index.html` file, replace `GTM-XXXXX` with your GTM ID
3. Configure your GTM account to track the following events:
   - Event name: `contact_click`
   - Variables:
     - `contact_type`: Type of contact clicked
     - `device_type`: Mobile or desktop
     - `browser`: Browser name

### 5. FormSubmit Setup

The form uses FormSubmit.co to send emails:

1. The first time someone submits the form, you'll receive a confirmation email
2. Click the activation link in that email to start receiving form submissions
3. All future submissions will be sent directly to your email

## Customization

### Colors and Styling

Edit `styles.css` to change colors and styling. The primary colors are defined at the top of the file using CSS variables:

```css
:root {
    --primary-color: #333;
    --bg-color: #f8f8f8;
    --card-bg: #fff;
    --text-color: #333;
    --accent-color: #3498db;
    /* more variables... */
}
```

### Form Fields

To modify the form fields, edit the `<form>` section in `index.html`.

## Troubleshooting

### Form Not Sending Emails

1. Check if you've confirmed the FormSubmit activation email
2. Look in your spam folder for the confirmation email
3. Try using a direct form submission method by adding your email to the form action:
   
   ```html
   <form id="contactForm" action="https://formsubmit.co/your-email@example.com" method="POST">
   ```

### Profile Image Not Loading

1. Check if the path/URL in `contact-data.json` is correct
2. Verify that the image file exists and is accessible
3. The system will fall back to showing your initials if the image fails to load

### QR Code Issues

1. QR code may not work if your server is not using HTTPS
2. Make sure your hosting provider supports HTTPS
3. The QR code contains a direct vCard data URI, so it should work offline

### JSON File Not Loading

1. Make sure the `contact-data.json` file is in the same directory as the HTML file
2. Check that the file name is exactly "contact-data.json" (case sensitive)
3. Verify the JSON content is valid (no trailing commas, properly quoted strings)
4. If hosting on Cloudflare Pages, make sure all files were uploaded correctly

## Debug Mode

If you're experiencing issues, you can enable debug logging:

1. Open the browser's developer console (F12 or right-click > Inspect > Console)
2. Check for any error messages
3. The script includes multiple console logs to help identify where problems might occur

## License

This project is free to use for personal and commercial purposes.

## Credits

- QR Code generation: [qrcode.js](https://github.com/soldair/node-qrcode)
- Icons: [Font Awesome](https://fontawesome.com/)
- Form handling: [FormSubmit.co](https://formsubmit.co/)