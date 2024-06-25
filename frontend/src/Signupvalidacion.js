function validacionReg(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasena_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const nombre_apellido_pattern = /^[a-zA-Z]+$/;

    if (values.nombre === "" || !nombre_apellido_pattern.test(values.nombre)) {
        error.nombre = 'El nombre solo puede contener caracteres alfabéticos y no puede quedar vacío.';
    }

    if (values.apellido === "" || !nombre_apellido_pattern.test(values.apellido)) {
        error.apellido = 'El apellido solo puede contener caracteres alfabéticos y no puede quedar vacío.';
    }

    if (values.email === "") {
        error.email = 'El email no puede quedar vacío.';
    } else if (!values.email.includes('@')) {
        error.email = 'El email debe contener un arroba (@).';
    } else if (!email_pattern.test(values.email)) {
        error.email = 'El formato del email no es válido.';
    }

    if (values.contrasena === "") {
        error.contrasena = 'La contraseña es obligatoria.';
    } else if (!contrasena_pattern.test(values.contrasena)) {
        error.contrasena = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número.';
    }

    if (values.vericontra === "") {
        error.vericontra = 'La verificación de contraseña es obligatoria.';
    } else if (values.vericontra !== values.contrasena) {
        error.vericontra = 'Las contraseñas no coinciden.';
    }

    if (values.fechanac === "") {
        error.fechanac = 'La fecha de nacimiento es obligatoria.';
    } else {
        const hoy = new Date();
        const fechaNacimiento = new Date(values.fechanac);
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            error.fechanac = 'Debes ser mayor de edad para registrarte.';
        }
    }

    return error;
}

export default validacionReg;