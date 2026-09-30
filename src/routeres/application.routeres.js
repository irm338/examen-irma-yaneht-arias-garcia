
// src/routeres/application.routeres.js
const { Router } = require('express');
const router = Router();

// Importa tus controladores (asegúrate de que las rutas de las carpetas sean correctas)
const { registrarPostulacion } = require('../controllers/application.controller');
const { listarPostulaciones } = require('../controllers/application.controller');
const { cambiarEstadoPostulacion } = require('../controllers/application.controller');

// Definición de Endpoints
router.post('/', registrarPostulacion);
router.get('/', listarPostulaciones);
router.put('/:id/status', cambiarEstadoPostulacion);

module.exports = router;