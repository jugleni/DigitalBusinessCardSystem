# Digital Business Card Deployment Instructions

This guide provides step-by-step instructions for setting up and hosting your digital business card on Cloudflare Pages.

## Required Files

1. `index.html`: The main file containing all HTML, CSS, and JavaScript code
2. `contact-data.json`: JSON file with your contact information
3. A profile image (separate upload or using a URL)

## Project Setup

### 1. Configure the contact-data.json file

Edit the `contact-data.json` file to include your information:
```json
{
  "name": "Jugleni Krinski",
  "title": "Network Support | Software & App Development | Digital Marketing for Funnels",
  "company": "Krinski",
  "email": "jugleni@krinski.com",
  "phone": "+1 469-000-0000",
  "website": "https://www.jugleni.com",
  "instagram": "@jugleni",
  "linkedin": "https://linkedin.com/in/jugleni",
  "twitter": "https://twitter.com/jugleni",
  "facebook": "https://facebook.com/jugleni",
  "github": "https://github.com/jugleni",
  "profileImage": "https://placehold.co/200x200"
}
```

### 2. Configure the Form to Receive Emails

The system uses [FormSubmit.co](https://formsubmit.co/), a free form processing service. The form is already configured to send data to the email defined in the JSON file, but you need to activate it:

1. The first time someone submits a form, you'll receive a confirmation email from FormSubmit.co
2. Follow the instructions in that email to activate the service
3. After confirmation, all completed forms will be sent directly to your email

### 3. Optional: Set Up Google Sheets Integration

If you prefer to receive data in a Google Sheet:

1. Create a new spreadsheet in Google Sheets
2. Use the [FormSubmit for Google Sheets](https://workspace.google.com/marketplace/app/formsubmit_for_google_sheets/262617744923) add-on
3. Configure the add-on to receive data from your form

## Hosting on Cloudflare Pages

### 1. Create a Cloudflare Account (if you don't have one)

1. Go to [cloudflare.com](https://cloudflare.com) and create a free account
2. Confirm your email and access the dashboard

### 2. Host the Project on Cloudflare Pages

#### Option 1: Using GitHub or another Git repository

1. Create a repository with your files
2. In the Cloudflare dashboard, go to "Pages" > "Create a project"
3. Connect your GitHub/GitLab account and select the repository
4. Configure as:
   - Framework preset: None
   - Build command: leave blank
   - Build output directory: leave blank
5. Click "Save and Deploy"

#### Option 2: Direct Upload (easier)

1. In the Cloudflare dashboard, go to "Pages" > "Create a project"
2. Select "Direct Upload"
3. Drag and drop your folder containing the files or select the files individually
4. Click "Deploy site"

### 3. Configure a Custom Domain (Optional)

1. In the project dashboard on Cloudflare Pages, go to "Custom domains"
2. Click "Set up a custom domain"
3. Follow the instructions to configure your custom domain

## Features and Usage

### How the Digital Card Works:

1. **Contact View**: Visitors will see your information in a beautiful, professional layout
2. **Save Contact**: Visitors can download a VCF file compatible with Android and iOS
3. **Share QR Code**: You can share the QR Code for quick access to your contact
4. **Return Form**: Visitors can share their information, which will be sent to your email

### How to Use:

1. Share the Cloudflare link (example: `your-project.pages.dev`)
2. Or share the QR Code by accessing the site and clicking "Save contact"
3. If you have a custom domain, use it for a more professional address

## Customization Tips

If you want to customize your digital card:

1. **Colors**: In the HTML file, modify the CSS variables in `:root` to change the colors
2. **Icons**: You can find more icons at [Font Awesome](https://fontawesome.com/icons) and replace them in the HTML
3. **Profile image**: Upload a high-quality image (recommended: square, 500x500px)

## Troubleshooting

### Form is not sending emails:
- Check if you've properly configured the email in FormSubmit
- Check your spam folder for the confirmation email from FormSubmit

### QR Code is not working:
- Make sure you're using HTTPS (Cloudflare Pages already provides this)
- Test the QR Code on different devices

### Contact file is not saving on some devices:
- Make sure the phone number format is correct (+XX XX XXXXX-XXXX)
- Check if the VCF file is properly formatted

## Support

For Cloudflare Pages issues, see the [official documentation](https://developers.cloudflare.com/pages/).

For FormSubmit issues, visit [formsubmit.co/help](https://formsubmit.co/help).