// Función para calcular puntaje y determinar prioridad
function calcularPuntajeYPrioridad(candidato, vacante, activeApplicationsCount, source, coverLetter) {
    let puntaje = 0;

    // 1. Años de experiencia iguales o superiores al mínimo
    if (candidato.experiencia_anios >= vacante.experiencia_minima) {
        puntaje += 4;
    }

    // 2. Fuente de postulación
    if (source === 'REFERRAL') {
        puntaje += 3;
    } else if (source === 'INTERNAL') {
        puntaje += 2;
    }

    // 3. Carta de presentación (palabras clave case-insensitive)
    const lowerCoverLetter = coverLetter.toLowerCase();
    const contienePalabra = ['node', 'sql', 'api'].some(palabra => lowerCoverLetter.includes(palabra));
    if (contienePalabra) {
        puntaje += 2;
    }

    // 4. Longitud de la carta (> 500 caracteres)
    if (coverLetter.length > 500) {
        puntaje += 1;
    }

    // 5. Penalización por 3 o más postulaciones activas en otras vacantes
    if (activeApplicationsCount >= 3) {
        puntaje -= 2;
    }

    // El puntaje total nunca puede ser negativo
    if (puntaje < 0) {
        puntaje = 0;
    }

    // 6. Determinar Prioridad según el puntaje total
    let prioridad = 'LOW';
    if (puntaje >= 7) {
        prioridad = 'TOP';
    } else if (puntaje >= 5) {
        prioridad = 'HIGH';
    } else if (puntaje >= 3) {
        prioridad = 'MEDIUM';
    }

    return { puntaje, prioridad };
}

module.exports = { calcularPuntajeYPrioridad };