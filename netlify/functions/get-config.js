// netlify/functions/get-emailjs-config.js
export async function handler() {
    // Access your EmailJS environment variables
    const emailjsConfig = {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateIdContact: process.env.EMAILJS_TEMPLATE_ID_CONTACT,
      templateIdAppointment: process.env.EMAILJS_TEMPLATE_ID_APPOINTMENT
    };
    
    return {
      statusCode: 200,
      body: JSON.stringify(emailjsConfig)
    };
  }