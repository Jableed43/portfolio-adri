async function initEmailJS(publicKey) {
    emailjs.init(publicKey);
}

function sendEmailForm(formId, serviceID, templateID, successCallback, errorCallback) {
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Formulario con ID '${formId}' no encontrado.`);
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        emailjs.sendForm(serviceID, templateID, form)
            .then(successCallback, errorCallback);
    });
}

async function startApp() {
    const env = await getEnvVariables();

    if (!env || !env.EMAILJS_PUBLIC_KEY || !env.EMAILJS_SERVICE_ID || !env.EMAILJS_TEMPLATE_ID_APPOINTMENT) {
        console.error("No se pudieron cargar las variables de entorno.");
        return;
    }

    initEmailJS(env.EMAILJS_PUBLIC_KEY);

    const formId = "appointment-form";
    const successCallback = () => alert("¡Cita agendada con éxito!");
    const errorCallback = (err) => alert("Error al agendar la cita:", err);

    sendEmailForm(formId, env.EMAILJS_SERVICE_ID, env.EMAILJS_TEMPLATE_ID_APPOINTMENT, successCallback, errorCallback);
}

// Ejecutar la aplicación
startApp();
