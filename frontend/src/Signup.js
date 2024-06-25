import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validacionReg from './Signupvalidacion';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    vericontra: '',
    fechanac: '',
    usuario: '',
    rol: 'cliente', // Establece un valor predeterminado para rol si es necesario
    genero: 'masculino' // Establece un valor predeterminado para género si es necesario
  });

  const navigate = useNavigate();
  const [errores, setErrores] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrores(validacionReg(values));

    // Verifica que no haya errores de validación antes de enviar la solicitud POST
    if (Object.values(errores).every(error => error === "")) {
        axios.post('http://localhost:3004/signup', values)
            .then(res => {
                console.log('Respuesta del servidor:', res.data);
                navigate('/'); // Redirige al usuario después de un registro exitoso
            })
            .catch(err => {
                console.error('Error al realizar la solicitud POST:', err.response.data);
                setErrores({ usuario: 'El usuario ya existe' }); // Mostrar mensaje de error en el formulario
            });
    }
};

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Registro</h2>
        <form action='' onSubmit={handleSubmit}>
          
          <div className='mb-4'>
            <label htmlFor='nombre' className='block text-gray-700 font-semibold mb-2'>Nombre</label>
            <input type='text' placeholder='Inserte su nombre' name='nombre' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.nombre} onChange={handleInput}/>
            {errores.nombre && <span className='text-red-500 mt-2'>{errores.nombre}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='apellido' className='block text-gray-700 font-semibold mb-2'>Apellido</label>
            <input type='text' placeholder='Inserte su apellido' name='apellido' 
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.apellido} onChange={handleInput}/>
            {errores.apellido && <span className='text-red-500 mt-2'>{errores.apellido}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='usuario' className='block text-gray-700 font-semibold mb-2'>Usuario</label>
            <input type='text' placeholder='Cree su usuario' name='usuario' 
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.usuario} onChange={handleInput}/>
            {errores.usuario && <span className='text-red-500 mt-2'>{errores.usuario}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='genero' className='block text-gray-700 font-semibold mb-2'>Género</label>
            <select id="genero" name="genero" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          <div className='mb-6'>
            <label htmlFor='contrasena' className='block text-gray-700 font-semibold mb-2'>Contraseña</label>
            <input type='password' placeholder='Cree una contraseña' name='contrasena' 
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.contrasena} onChange={handleInput}/>
            {errores.contrasena && <span className='text-red-500 mt-2'>{errores.contrasena}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='vericontra' className='block text-gray-700 font-semibold mb-2'>Repita su contraseña</label>
            <input type='password' placeholder='Confirme' name='vericontra' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.vericontra} onChange={handleInput}/>
            {errores.vericontra && <span className='text-red-500 mt-2'>{errores.vericontra}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor="fechanac" className="block text-gray-700 font-semibold mb-2">Fecha de Nacimiento</label>
            <input type="date" id="fechanac" name="fechanac" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" value={values.fechanac} onChange={handleInput}/>
            {errores.fechanac && <span className='text-red-500 mt-2'>{errores.fechanac}</span>}
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input type='email' placeholder='Inserte su email' name='email' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' value={values.email} onChange={handleInput}/>
            {errores.email && <span className='text-red-500 mt-2'>{errores.email}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='rol' className='block text-gray-700 font-semibold mb-2'>Rol</label>
            <select id="rol" name="rol"className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300'>
            Registrar
          </button>
          <p className='mt-4 text-gray-600 text-center'>You agree to our terms and policies</p>
          <Link to="/" className='block mt-4 text-center text-green-500 hover:underline'>
            Iniciar sesion
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup;
