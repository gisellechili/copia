/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.js', // Archivos JSX dentro de la carpeta src
    './public/index.html' // Archivo HTML público
  ],
  theme: {
    extend: {
      colors: {
        backgroundGreen: '#A4C3BB',
        buttons: '#1B6A72',
        hoversButtons: '#2C7178',
        colorLogo: '#03cffc'
      },
    },
  },
  plugins: [],
}

