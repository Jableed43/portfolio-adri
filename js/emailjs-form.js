async function initEmailJS(publicKey) {
    emailjs.init(publicKey);
}

function sendEmailForm(formId, serviceID, templateID, successCallback, errorCallback) {
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Formulario con ID '${formId}' no encontrado.`);
        return null;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm(serviceID, templateID, form)
            .then(() => successCallback(form))
            .catch(errorCallback);
    });

    return form;
}

async function startApp() {
    try {
        const response = await fetch('/.netlify/functions/get-config');
        const env = await response.json();
        if (!env.publicKey || !env.serviceId || !env.templateIdContact) {
            console.error("No se pudieron cargar las variables de entorno.");
            return;
        }

        initEmailJS(env.publicKey);

        const formId = 'contactForm';
        const successCallback = (formElement) => {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                if (formElement) {
                    formElement.reset();
                }
            });
        };

        const errorCallback = (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: err,
            });
        };

        const contactForm = sendEmailForm(formId, env.serviceId, env.templateIdContact, successCallback, errorCallback);

        if (!contactForm) {
            console.error(`No se pudo adjuntar el listener al formulario con ID '${formId}'.`);
        }

    } catch (error) {
        console.error("Error al cargar la configuración de EmailJS:", error);
    }
}

startApp();
