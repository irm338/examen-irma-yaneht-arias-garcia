// Ejemplo de controlador para el registro de postulaciones
const { calcularPuntajeYPrioridad } = require('../services/application.service');

async function registrarPostulacion(req, res) {
    try {
        const { candidateId, vacancyId, source, coverLetter } = req.body;

        // 1. Validar datos obligatorios básicos
        if (!candidateId || !vacancyId || !source || !coverLetter) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // 2. Validar fuentes permitidas
        const fuentesPermitidas = ['REFERRAL', 'INTERNAL', 'JOB_BOARD', 'OTHER'];
        if (!fuentesPermitidas.includes(source)) {
            return res.status(400).json({ error: 'La fuente de postulación no es válida.' });
        }

        return res.status(201).json({
            message: 'Postulación registrada exitosamente',
            data: {
                // id: nuevaPostulacion.id,
                // puntaje,
                // prioridad,
                // estado: 'RECEIVED'
            }
        });

    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
}

module.exports = { registrarPostulacion };