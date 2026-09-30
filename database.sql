
-- Eliminar tablas si ya existen (orden inverso por dependencias)
DROP TABLE IF EXISTS postulaciones;
DROP TABLE IF EXISTS vacantes;
DROP TABLE IF EXISTS candidatos;

-- 1. Tabla de Candidatos
CREATE TABLE candidatos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    experiencia_anios INT NOT NULL CHECK (experiencia_anios >= 0)
);

-- 2. Tabla de Vacantes
CREATE TABLE vacantes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    experiencia_minima INT NOT NULL CHECK (experiencia_minima >= 0),
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('OPEN', 'CLOSED'))
);

-- 3. Tabla de Postulaciones
CREATE TABLE postulaciones (
    id SERIAL PRIMARY KEY,
    candidato_id INT NOT NULL,
    vacante_id INT NOT NULL,
    carta_presentacion TEXT NOT NULL,
    fuente VARCHAR(30) NOT NULL CHECK (fuente IN ('REFERRAL', 'INTERNAL', 'JOB_BOARD', 'OTHER')),
    puntaje INT NOT NULL DEFAULT 0 CHECK (puntaje >= 0),
    prioridad VARCHAR(20) NOT NULL CHECK (prioridad IN ('LOW', 'MEDIUM', 'HIGH', 'TOP')),
    estado VARCHAR(20) NOT NULL DEFAULT 'RECEIVED' CHECK (estado IN ('RECEIVED', 'IN_REVIEW', 'REJECTED', 'HIRED')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_postulacion_candidato FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
    CONSTRAINT fk_postulacion_vacante FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE,
    CONSTRAINT uk_candidato_vacante UNIQUE (candidato_id, vacante_id)
);

-- Datos de prueba (3 candidatos, 2 vacantes con una CLOSED)
INSERT INTO candidatos (nombre, correo, experiencia_anios) VALUES
('Ana Gómez', 'ana.gomez@email.com', 4),
('Carlos Pérez', 'carlos.perez@email.com', 1),
('Lucía Méndez', 'lucia.mendez@email.com', 5);

INSERT INTO vacantes (titulo, experiencia_minima, estado) VALUES
('Desarrollador Backend Node.js', 2, 'OPEN'),
('Analista de Datos Junior', 1, 'CLOSED');