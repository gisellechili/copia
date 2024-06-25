import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validacion from './Loginvalidacion';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    contrasena: ''
  });

  const navigate = useNavigate();
  const [errores, setErrores] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validacion(values);
    setErrores(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:3004/login', values)
        .then(res => {
          if (res.data === 'Exito') {
            navigate('/home');
          } else {
            alert('No existe');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Iniciar Sesión</h2>
        <form action='' onSubmit={handleSubmit}>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input type='' placeholder='Inserte su email' name='email' onChange={handleInput} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' />
            {errores.email && <span className='text-red-900'> {errores.email}</span>}
          </div>

          <div className='mb-6'>
            <label htmlFor='contrasena' className='block text-gray-700 font-semibold mb-2'>Contraseña</label>
            <input type='password' placeholder='Inserte su contraseña' name='contrasena' onChange={handleInput} className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500' />
            {errores.contrasena && <span className='text-red-900'> {errores.contrasena}</span>}
          </div>

          <button type='submit' className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300'>
            Iniciar sesión
          </button>

          <p className='mt-4 text-gray-600 text-center'>You agree to our terms and policies</p>

          <Link to="/signup" className='block mt-4 text-center text-green-500 hover:underline'>Crear cuenta</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
