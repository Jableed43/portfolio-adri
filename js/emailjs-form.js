function initEmailJS(publicKey) {
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

(function() {
    const publicKey = '6JdbPIt9h7lR-Wo5p';
    const serviceID = 'service_8w8bgqr';
    const templateID = 'template_edi2e48';
    const formId = 'contactForm';

    initEmailJS(publicKey);

    const successCallback = () => {
        alert('Mensaje enviado!');
    };

    const errorCallback = (err) => {
        alert('Error al enviar el mensaje:', err);
    };

    sendEmailForm(formId, serviceID, templateID, successCallback, errorCallback);
})();