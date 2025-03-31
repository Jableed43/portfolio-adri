function initEmailJS(publicKey) {
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

(function () {
    const publicKey = "6JdbPIt9h7lR-Wo5p";
    const serviceID = "service_8w8bgqr";
    const templateID = "template_fx0js0c";
    const formId = "appointment-form";

    initEmailJS(publicKey);

    const successCallback = () => {
        alert("¡Cita agendada con éxito!");
    };

    const errorCallback = (err) => {
        alert("Error al agendar la cita:", err);
    };

    sendEmailForm(formId, serviceID, templateID, successCallback, errorCallback);
})();
