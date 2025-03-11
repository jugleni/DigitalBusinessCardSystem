// Log inicial para verificar se o script está carregando
console.log('Script.js está carregando...');

// DOM elements
const profileImage = document.getElementById('profileImage');
const profileName = document.getElementById('profileName');
const profileTitle = document.getElementById('profileTitle');
const profileCompany = document.getElementById('profileCompany');
const profileEducation = document.getElementById('profileEducation');
const contactLinks = document.getElementById('contactLinks');
const saveContactBtn = document.getElementById('saveContact');
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');
const qrModal = document.getElementById('qrModal');
const closeModalBtn = document.getElementById('closeModal');
const downloadVCardBtn = document.getElementById('downloadVCard');
const shareForm = document.getElementById('shareForm');

// Global contact data
let contactData = {};

// ------------------------
// Data loading functions
// ------------------------

/**
 * Load contact data from JSON file
 */
async function loadContactData() {
    console.log('Tentando carregar dados de contact-data.json');
    try {
        const response = await fetch('data.json');
        console.log('Resposta do fetch:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`Failed to load contact data: ${response.status} ${response.statusText}`);
        }
        
        contactData = await response.json();
        console.log('Dados carregados com sucesso:', contactData);
        initializeProfile();
    } catch (error) {
        console.error('Erro ao carregar dados JSON:', error);
        
        // Fallback para dados embutidos
        console.log('Usando dados de fallback');
        contactData = {
            "name": "Jugleni Krinski (Jake)",
            "title": "Network Support | Software & App Development | Digital Marketing for Funnels",
            "company": "Krinski",
            "education": "Theology Student at NPU Dallas",
            "email": "jugleni@krinski.com",
            "phone": "+1 469-328-5888",
            "website": "https://www.jugleni.com",
            "instagram": "@jugleni",
            "instagram_url": "https://instagram.com/jugleni",
            "linkedin": "https://linkedin.com/in/jugleni",
            "twitter": "@jugleni",
            "twitter_url": "https://twitter.com/jugleni",
            "facebook": "https://facebook.com/jugleni",
            "github": "https://github.com/jugleni",
            "profileImage": "https://placehold.co/200x200"
        };
        initializeProfile();
    }
}

// ------------------------
// Profile initialization
// ------------------------

/**
 * Initialize profile with contact data
 */
function initializeProfile() {
    console.log('Inicializando perfil...');
    
    document.title = `Digital Business Card - ${contactData.name}`;
    
    // Set profile image with error handling
    if (contactData.profileImage) {
        profileImage.src = contactData.profileImage;
        // Add error handling for image loading
        profileImage.onerror = function() {
            console.error("Error loading profile image. Using default image.");
            this.src = "https://placehold.co/200x200/222/fff?text=" + 
                encodeURIComponent(contactData.name.split(' ')[0][0] + contactData.name.split(' ')[1][0]);
        };
    } else {
        // Generate initials as fallback
        profileImage.src = "https://placehold.co/200x200/222/fff?text=" + 
            encodeURIComponent(contactData.name.split(' ')[0][0] + contactData.name.split(' ')[1][0]);
    }
    
    // Set text information
    profileName.textContent = contactData.name;
    profileTitle.textContent = contactData.title;
    profileCompany.textContent = contactData.company;
    
    // Set education if available
    if (contactData.education) {
        profileEducation.textContent = contactData.education;
    } else {
        profileEducation.style.display = 'none';
    }

    // Clear existing contact links
    contactLinks.innerHTML = '';

    // Create contact items with links and proper display
    createContactItem('fas fa-envelope', 'Email', contactData.email, `mailto:${contactData.email}`);
    createContactItem('fas fa-phone', 'Phone', contactData.phone, `tel:${contactData.phone}`);
    createContactItem('fas fa-globe', 'Website', contactData.website, ensureHttps(contactData.website));
    
    // Social media links with full URL display when appropriate
    if (contactData.instagram) {
        const igDisplay = contactData.instagram_url ? `${contactData.instagram} (${formatUrl(contactData.instagram_url)})` : contactData.instagram;
        const igUrl = contactData.instagram_url || `https://instagram.com/${contactData.instagram.replace('@', '')}`;
        createContactItem('fab fa-instagram', 'Instagram', igDisplay, igUrl);
    }
    
    if (contactData.linkedin) {
        createContactItem('fab fa-linkedin', 'LinkedIn', formatUrl(contactData.linkedin), contactData.linkedin);
    }
    
    if (contactData.twitter) {
        const twitterDisplay = contactData.twitter_url ? `${contactData.twitter} (${formatUrl(contactData.twitter_url)})` : contactData.twitter;
        const twitterUrl = contactData.twitter_url || `https://twitter.com/${contactData.twitter.replace('@', '')}`;
        createContactItem('fab fa-twitter', 'Twitter', twitterDisplay, twitterUrl);
    }
    
    if (contactData.facebook) {
        createContactItem('fab fa-facebook', 'Facebook', formatUrl(contactData.facebook), contactData.facebook);
    }
    
    if (contactData.github) {
        createContactItem('fab fa-github', 'GitHub', formatUrl(contactData.github), contactData.github);
    }
    
    console.log('Perfil inicializado com sucesso');
}

// ------------------------
// Contact item creation
// ------------------------

/**
 * Create contact item with icon, label, and value
 * @param {string} iconClass - Font Awesome icon class
 * @param {string} label - Contact label (Email, Phone, etc)
 * @param {string} value - Contact value
 * @param {string} url - URL to open when clicked (optional)
 */
function createContactItem(iconClass, label, value, url = null) {
    const contactItem = document.createElement('div');
    contactItem.className = 'contact-item';
    contactItem.setAttribute('data-contact-type', label.toLowerCase());

    const contactIcon = document.createElement('div');
    contactIcon.className = 'contact-icon';
    contactIcon.innerHTML = `<i class="${iconClass}"></i>`;

    const contactInfo = document.createElement('div');
    contactInfo.className = 'contact-info';

    const contactLabel = document.createElement('div');
    contactLabel.className = 'contact-label';
    contactLabel.textContent = label;

    const contactValue = document.createElement('div');
    contactValue.className = 'contact-value';
    contactValue.textContent = value;

    contactInfo.appendChild(contactLabel);
    contactInfo.appendChild(contactValue);
    contactItem.appendChild(contactIcon);
    contactItem.appendChild(contactInfo);

    if (url) {
        contactItem.addEventListener('click', () => {
            // Track the click before opening the URL
            trackContactClick(label.toLowerCase());
            
            // Use target="_blank" to open in a new tab
            // Add specific handling for mobile browsers
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // For iOS devices, Safari handles this well
                window.open(url, '_blank');
            } else if (/Android/i.test(navigator.userAgent)) {
                // For Android, Chrome/default browser
                window.open(url, '_blank');
            } else {
                // Default for other devices
                window.open(url, '_blank');
            }
        });
        contactItem.style.cursor = 'pointer';
    }

    contactLinks.appendChild(contactItem);
}

// ------------------------
// VCard & QR Code functions
// ------------------------

/**
 * Generate vCard content
 * @returns {string} vCard content as string
 */
function generateVCard() {
    // Start with basic vCard format
    let vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
N:${contactData.name.split(' ').pop()};${contactData.name.split(' ').shift()};;;
TITLE:${contactData.title}
ORG:${contactData.company}
EMAIL:${contactData.email}
TEL;TYPE=CELL:${contactData.phone}
URL:${contactData.website}`;

    // Add education if available
    if (contactData.education) {
        vCardContent += `\nNOTE:${contactData.education}`;
    }

    // Add social media profiles
    if (contactData.instagram) {
        vCardContent += `\nX-SOCIALPROFILE;TYPE=instagram:${contactData.instagram.replace('@', '')}`;
    }
    
    if (contactData.linkedin) {
        vCardContent += `\nX-SOCIALPROFILE;TYPE=linkedin:${contactData.linkedin}`;
    }
    
    if (contactData.twitter) {
        vCardContent += `\nX-SOCIALPROFILE;TYPE=twitter:${contactData.twitter.replace('@', '')}`;
    }
    
    if (contactData.facebook) {
        vCardContent += `\nX-SOCIALPROFILE;TYPE=facebook:${contactData.facebook}`;
    }
    
    if (contactData.github) {
        vCardContent += `\nX-SOCIALPROFILE;TYPE=github:${contactData.github}`;
    }
    
    // End vCard
    vCardContent += `\nEND:VCARD`;
    
    return vCardContent;
}

/**
 * Create QR code with vCard data URI
 */
function generateQRCode() {
    const qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = '';
    
    // Generate vCard content
    const vCardContent = generateVCard();
    
    // Create a Data URI for the vCard
    const vCardDataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vCardContent);
    
    // Generate QR code with the Data URI
    QRCode.toCanvas(qrcodeContainer, vCardDataUri, {
        width: 200,
        margin: 1,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) console.error(error);
    });
}

/**
 * Open contact directly in phone's contacts app
 */
function openContactInApp() {
    // Track the contact save action
    trackContactClick('save_contact');
    
    // Generate vCard content
    const vCardContent = generateVCard();
    
    // Create data URI for vCard
    const vCardDataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vCardContent);
    
    // Create a temporary link to open the vCard
    const a = document.createElement('a');
    a.href = vCardDataUri;
    a.setAttribute('download', `${contactData.name.replace(/\s+/g, '_')}.vcf`);
    
    // iOS/Safari requires the link to be in the DOM
    document.body.appendChild(a);
    
    // Click the link to download the file which will prompt the contacts app
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        
        // Show the share form after a short delay
        setTimeout(() => {
            shareForm.style.display = 'block';
            // Scroll to the form
            shareForm.scrollIntoView({ behavior: 'smooth' });
        }, 1000); // Delay showing the form to give time for the contacts app to open
    }, 100);
}

/**
 * Alternative method to open contact using legacy method for iOS
 */
function downloadVCard() {
    // Track the download action
    trackContactClick('download_vcard');
    
    const vCardContent = generateVCard();
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    // Try to use direct window.location approach first (works better on some mobile devices)
    try {
        window.location.href = url;
    } catch (e) {
        // Fallback to traditional link method
        const a = document.createElement('a');
        a.href = url;
        a.download = `${contactData.name.replace(/\s+/g, '_')}.vcf`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    // Show the share form after a short delay
    setTimeout(() => {
        shareForm.style.display = 'block';
        qrModal.style.display = 'none';
        // Scroll to the form
        shareForm.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// ------------------------
// Form submission
// ------------------------

/**
 * Submit form data
 * @param {Event} e - Form submit event
 */
function submitForm(e) {
    e.preventDefault();
    
    // Display loading message
    statusMessage.textContent = 'Sending your information...';
    statusMessage.className = 'status-message';
    statusMessage.style.display = 'block';
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Add recipient email from contact data
    formData.append('_replyto', contactData.email);
    
    // Important: Add these fields for FormSubmit.co to work properly
    formData.append('_subject', `New contact from ${formData.get('fullName')}`);
    formData.append('_template', 'table'); // Use table template for better formatting
    
    // Convert FormData to URL-encoded string for fetch request
    const formBody = new URLSearchParams(formData);
    
    // Send data using formsubmit.co
    fetch('https://formsubmit.co/ajax/' + contactData.email, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: formBody
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Success message
        statusMessage.textContent = 'Thank you! Your contact information has been sent successfully.';
        statusMessage.className = 'status-message success';
        contactForm.reset();
        
        // Track successful submission
        trackContactClick('form_submitted');
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Try alternative submission method using form action
        console.log('Trying alternative submission method...');
        
        // Create a hidden form for direct submission
        const backupForm = document.createElement('form');
        backupForm.method = 'POST';
        backupForm.action = 'https://formsubmit.co/' + contactData.email;
        backupForm.style.display = 'none';
        
        // Add all form fields
        for (const pair of formData.entries()) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = pair[0];
            input.value = pair[1];
            backupForm.appendChild(input);
        }
        
        // Add return URL to come back to this page
        const returnUrl = document.createElement('input');
        returnUrl.type = 'hidden';
        returnUrl.name = '_next';
        returnUrl.value = window.location.href;
        backupForm.appendChild(returnUrl);
        
        // Add to DOM and submit
        document.body.appendChild(backupForm);
        backupForm.submit();
        
        // No need for error message as the page will redirect
    });
}

// ------------------------
// Utility functions
// ------------------------

/**
 * Track contact clicks - Google Tag Manager integration
 * @param {string} contactType - Type of contact clicked
 */
function trackContactClick(contactType) {
    // Check if Google Tag Manager is available
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'contact_click',
            'contact_type': contactType,
            'device_type': /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
            'browser': getBrowserName()
        });
    }
    
    // Log to console for debugging
    console.log(`Contact clicked: ${contactType} on ${getBrowserName()}`);
}

/**
 * Get browser name for analytics
 * @returns {string} Browser name
 */
function getBrowserName() {
    const userAgent = navigator.userAgent;
    let browserName;
    
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
        browserName = 'Safari';
    } else if (/Chrome/i.test(userAgent)) {
        browserName = 'Chrome';
    } else if (/Firefox/i.test(userAgent)) {
        browserName = 'Firefox';
    } else if (/MSIE|Trident/i.test(userAgent)) {
        browserName = 'IE';
    } else if (/Edge/i.test(userAgent)) {
        browserName = 'Edge';
    } else {
        browserName = 'Unknown';
    }
    
    return browserName;
}

/**
 * Ensure URL starts with http:// or https://
 * @param {string} url - URL to format
 * @returns {string} Formatted URL
 */
function ensureHttps(url) {
    if (!url) return '';
    return url.startsWith('http') ? url : 'https://' + url;
}

/**
 * Format URL for display (remove https:// and trailing slash)
 * @param {string} url - URL to format
 * @returns {string} Formatted URL
 */
function formatUrl(url) {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// ------------------------
// Event listeners
// ------------------------

// Event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Inicializando listeners de eventos');
    
    // Load contact data
    loadContactData();

    // Save contact button - Now opens contact directly and shows form afterward
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão Save Contact clicado');
            
            // For mobile devices, try to open contact directly
            if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                openContactInApp();
            } else {
                // For desktop, show QR code modal
                generateQRCode();
                qrModal.style.display = 'flex';
            }
        });
    } else {
        console.error('Botão saveContactBtn não encontrado');
    }

    // Close QR modal and show share form
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            qrModal.style.display = 'none';
            shareForm.style.display = 'block';
            // Scroll to the form
            shareForm.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Download vCard button
    if (downloadVCardBtn) {
        downloadVCardBtn.addEventListener('click', downloadVCard);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', submitForm);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.style.display = 'none';
        }
    });
    
    console.log('Todos os event listeners configurados');
});

// Verificação adicional após 2 segundos
setTimeout(() => {
    if (!profileName.textContent) {
        console.log('Problema detectado: Perfil não carregado após 2 segundos. Tentando novamente...');
        loadContactData();
    }
}, 2000);