function tieneNumeros(inputString) {
    // Expresión regular para buscar cualquier número en el string
    const regex = /\d/;

    // El método test() devuelve true si encuentra un número, false si no
    return regex.test(inputString);
}

// verifica que un campo de texto no contenga números y contenga al menos 3 caracteres
function validarInputSimple(elemento) {
    if (elemento.value === "") {
        elemento.setCustomValidity("El campo no puede estar vacío");
    } else if (tieneNumeros(elemento.value)) {
        elemento.setCustomValidity("El campo no debe contener números");
    } else if (elemento.value.length <= 2) {
        elemento.setCustomValidity("El campo debe contener al menos 3 caracteres");
    } else if (elemento.value.length > 256) {
        elemento.setCustomValidity("El valor ingresado es demasiado largo");
    } else {
        elemento.setCustomValidity(""); // Limpiar el mensaje si la validación pasa
    }
}

// verifica que una dirección de email tenga el formato correcto
function validarEmail(email) {
    if (email.value.length < 5) {
        email.setCustomValidity("La dirección de correo electrónico debe tener al menos 5 caracteres");
        return;
    }

    if (email.value.length > 256) {
        email.setCustomValidity("La dirección de correo electrónico es demasiado larga");
        return;
    }

    const arrobaCount = (email.value.match(/@/g) || []).length;
    if (arrobaCount != 1) {
        email.setCustomValidity("La dirección de correo electrónico debe contener un arroba (@)");
        return;
    }

    const partes = email.value.split("@");

    const usuario = partes[0];
    if (usuario.length < 1) {
        email.setCustomValidity("La dirección de correo electrónico debe tener un usuario");
        return;
    }
    const dominio = partes[1];
    if (dominio.length < 1) {
        email.setCustomValidity("La dirección de correo electrónico debe tener un dominio");
        return;
    }
    const dominioPuntosCount = (email.value.match(/\./g) || []).length;
    if (dominioPuntosCount == 0) {
        email.setCustomValidity("El dominio debe contener una extensión final, luego de un punto (.)");
        return;
    }

    const dominioPartes = dominio.split(".");

    const dominioPrimeraParte = dominioPartes[0];
    if (dominioPrimeraParte.length == 0) {
        email.setCustomValidity("La dirección de correo electrónico debe tener un dominio");
        return;
    }

    const dominioPrimerNivel = dominioPartes[1];
    if (dominioPrimerNivel.length == 0) {
        email.setCustomValidity("El dominio debe contener una extensión final, luego de un punto (.)");
        return;
    }

    email.setCustomValidity(""); // Limpiar el mensaje si la validación pasa
}

// verifica que una fecha corresponda a una persona mayor de 18 y menor a 120 años
function validarFechaNacimiento(birthdate) {
    const dateHoy = new Date();
    const dateFechaNacimiento = new Date(birthdate.value);
    const mesesDiferencia = dateHoy.getMonth() - dateFechaNacimiento.getMonth();
    let edad = dateHoy.getFullYear() - dateFechaNacimiento.getFullYear();

    if (mesesDiferencia < 0 || (mesesDiferencia == 0 && dateHoy.getDate() < dateFechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        birthdate.setCustomValidity("Debes ser mayor de 18 años para rellenar este formulario");
    } else if (edad > 120) {
        birthdate.setCustomValidity("La fecha de nacimiento debe corresponder a una persona viva");
    } else {
        birthdate.setCustomValidity("");
    }
}

document.getElementById("nombre").addEventListener("input", function () {
    validarInputSimple(this);
});
document.getElementById("apellido").addEventListener("input", function () {
    validarInputSimple(this);
});
document.getElementById("correo").addEventListener("input", function () {
    validarEmail(this);
});
document.getElementById("nacimiento").addEventListener("input", function () {
    validarFechaNacimiento(this);
});
document.getElementById("pais").addEventListener("input", function () {
    validarInputSimple(this);
});

document.getElementById("formulario").addEventListener("submit", function (event) {
    const input = document.getElementById("nombre");
    if (!input.checkValidity()) {
        event.preventDefault(); // Evita el envío si no pasa la validación
    }
});

let estiloOscuro = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

function actualizarEstilo() {
    document.documentElement.style.setProperty("--fondo", estiloOscuro ? "#2c2c2c" : "#f5deb3");
    document.documentElement.style.setProperty("--titulo", estiloOscuro ? "#e0e0e0" : "#5d4037");
    document.documentElement.style.setProperty("--tablero", estiloOscuro ? "#3e3e3e" : "#d2b48c");
    document.documentElement.style.setProperty("--textos", estiloOscuro ? "#e0e0e0" : "#3e3e3e");
    document.documentElement.style.setProperty("--cajas", estiloOscuro ? "#555" : "#fdfffc");
    document.documentElement.style.setProperty("--cajas-texto", estiloOscuro ? "#e0e0e0" : "#2c2c2c");
    document.documentElement.style.setProperty("--cajas-borde", estiloOscuro ? "#e0e0e0" : "#2c2c2c");
}

function cambiarEstilo() {
    estiloOscuro = !estiloOscuro;
    actualizarEstilo();
}

function enviarFormulario() {
    // Verificar si el formulario es válido
    const form = document.getElementById("formulario");
    if (form.checkValidity()) {
        alert("Formulario enviado correctamente!\n(De mentirita)");
    }
}

actualizarEstilo();

console.log("Saludos navegante!");
