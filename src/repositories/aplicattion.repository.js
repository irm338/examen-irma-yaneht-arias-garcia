// Repositorio para consultar postulaciones con filtros y ordenamiento
// (Asumiendo el uso de un pool de conexión compatible con PostgreSQL, ej. 'pg')

async function obtenerPostulaciones(filtros = {}) {
    let query = `
        SELECT 
            p.id AS postulacion_id,
            c.nombre AS candidato_nombre,
            c.correo AS candidato_correo,
            v.titulo AS vacante_titulo,
            p.carta_presentacion,
            p.fuente,
            p.puntaje,
            p.prioridad,
            p.estado,
            p.fecha_creacion,
            p.fecha_actualizacion
        FROM postulaciones p
        INNER JOIN candidatos c ON p.candidato_id = c.id
        INNER JOIN vacantes v ON p.vacante_id = v.id
        WHERE 1 = 1
    `;

    const params = [];
    let paramIndex = 1;

    // Filtro dinámico por estado (si se proporciona)
    if (filtros.status) {
        query += ` AND p.estado = $${paramIndex++}`;
        params.push(filtros.status);
    }

    // Filtro dinámico por vacante (si se proporciona)
    if (filtros.vacancyId) {
        query += ` AND p.vacante_id = $${paramIndex++}`;
        params.push(filtros.vacancyId);
    }

    // Ordenamiento requerido: Mayor puntaje primero, luego fecha más antigua
    query += ` ORDER BY p.puntaje DESC, p.fecha_creacion ASC`;

    // Ejecución de la consulta en la base de datos
    // const { rows } = await pool.query(query, params);
    // return rows;
}

module.exports = { obtenerPostulaciones };