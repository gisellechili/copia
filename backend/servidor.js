const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "evaluacion_modulo"
});

// Ruta para manejar la solicitud POST de registro
app.post('/signup', (req, res) => {
    // Verificar si el usuario ya existe
    const checkUserQuery = "SELECT COUNT(*) AS count FROM signup WHERE usuario = ?";
    db.query(checkUserQuery, req.body.usuario, (err, results) => {
        if (err) {
            console.error("Error al verificar usuario:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        if (results[0].count > 0) {
            // Si ya existe un usuario con el mismo nombre, devolver un error
            return res.status(400).json({ error: "El usuario ya existe" });
        } else {
            // Si el usuario no existe, proceder con la inserción
            const sql = "INSERT INTO signup (`nombre`, `apellido`, `usuario`, `genero`, `contrasena`, `vericontra`, `fechanac`, `email`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
                req.body.nombre,
                req.body.apellido,
                req.body.usuario,
                req.body.genero,
                req.body.contrasena,
                req.body.vericontra,
                req.body.fechanac,
                req.body.email,
                req.body.rol,
            ];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error al insertar en la base de datos:", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                console.log("Usuario registrado correctamente");
                return res.status(200).json({ message: "Usuario registrado correctamente" });
            });
        }
    });
});


// Ruta para manejar la solicitud POST de inicio de sesión
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM signup WHERE email = ? AND contrasena = ?";
    const { email, contrasena } = req.body;
    db.query(sql, [email, contrasena], (err, data) => {
        if (err) {
            return res.json('Error');
        }
        if (data.length > 0) {
            return res.json('Exito');
        } else {
            return res.json('Failed');
        }
    });
});

app.listen(3004, () => {
    console.log('Servidor backend escuchando en el puerto 3004');
});
