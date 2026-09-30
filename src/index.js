
// src/index.js
const express = require('express');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const app = express();

// Middleware para que Express sepa interpretar JSON en las peticiones HTTP
app.use(express.json());

// Importar y montar las rutas de la API
const applicationRoutes = require('./routeres/application.routeres');
app.use('/applications', applicationRoutes);

// Definir el puerto y poner a escuchar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});