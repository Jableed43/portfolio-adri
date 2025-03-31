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
        emailjs.sendForm(serviceID, templateID, this)
            .then(successCallback, errorCallback);
    });
}

async function startApp() {
    const env = await getEnvVariables();

    if (!env || !env.EMAILJS_PUBLIC_KEY || !env.EMAILJS_SERVICE_ID || !env.EMAILJS_TEMPLATE_ID_CONTACT) {
        console.error("No se pudieron cargar las variables de entorno.");
        return;
    }

    initEmailJS(env.EMAILJS_PUBLIC_KEY);

    const formId = 'contactForm';
    const successCallback = () => alert('Mensaje enviado!');
    const errorCallback = (err) => alert('Error al enviar el mensaje:', err);

    sendEmailForm(formId, env.EMAILJS_SERVICE_ID, env.EMAILJS_TEMPLATE_ID_CONTACT, successCallback, errorCallback);
}

startApp();
