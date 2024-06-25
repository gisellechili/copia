function validacion(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const contrasena_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.email === "") {
        error.email = 'El email no puede quedar vacio.'
    
    } else if (values.email.includes('@')) {
        error.email = 'El email debe contener un arroba (@).';

    } else if (!email_pattern.test(values.email)) {
        error.email = 'El email no coindice'
    } else {
        error.email = ""
    }

    if (values.contrasena === "") {
        error.contrasena = 'La contrasena es obligatoria'
    }
    else if (!contrasena_pattern.test(values.contrasena)) {
        error.contrasena = 'La contrasena no coindice'
    } else {
        error.contrasena = ""
    }
    return error;
}

export default validacion;