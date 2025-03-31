async function initEmailJS(publicKey) {
    emailjs.init(publicKey);
}

function sendEmailForm(formId, serviceID, templateID, successCallback, errorCallback) {
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Formulario con ID '${formId}' no encontrado.`);
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm(serviceID, templateID, form)
            .then(successCallback)
            .catch(errorCallback);
    });
}

async function startApp() {
    try {
        const response = await fetch('/netlify/functions/get-emailjs-config');
        const env = await response.json();

        if (!env.publicKey || !env.serviceId || !env.templateIdContact) {
            console.error("No se pudieron cargar las variables de entorno.");
            return;
        }

        initEmailJS(env.publicKey);

        const formId = 'contactForm';
        const successCallback = () => alert('Mensaje enviado!');
        const errorCallback = (err) => alert('Error al enviar el mensaje:', err);

        sendEmailForm(formId, env.serviceId, env.templateIdContact, successCallback, errorCallback);
    } catch (error) {
        console.error("Error al cargar la configuración de EmailJS:", error);
    }
}

startApp();
