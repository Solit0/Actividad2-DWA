import { pool } from '../db.js';
export const getAllCalificaciones = async () => {
    const result = await pool.query('SELECT * FROM calificaciones');
    return result.rows;
};

export const getCalificacionById = async (id) => {
    const result = await pool.query('SELECT * FROM calificaciones WHERE calificacionId = $1', [id]);
    if (result.rows.length === 0) {
        const error = new Error('Calificación no encontrada');
        error.statusCode = 404;
        throw error;
    }
    return result.rows[0];
};
export const createCalificacion = async ({ publicacionId, usuarioId, calificacion }) => {
    try {
        const result = await pool.query(
            `INSERT INTO calificaciones (publicacionId, usuarioId, calificacion) VALUES ($1, $2, $3) RETURNING *`, [publicacionId, usuarioId, calificacion]
        );
        return result.rows[0];
    } catch (error) {
      //Aqui se maneja el error de clave unica violada, porque en la base de datos se definio que un usuario no puede calificar dos veces la misma publicacion asignandole una restriccion de clave unica
        if (error.code === '23505') {
            const err = new Error('Este usuario ya ha calificado esta publicación');
            err.statusCode = 400;
            throw err;
        }
        throw error;
    }
};
export const updateCalificacion = async (id, { calificacion }) => {
    const result = await pool.query(
        `UPDATE calificaciones SET calificacion = $1 WHERE calificacionId = $2 RETURNING *`,
        [calificacion, id]
    );

    if (result.rows.length === 0) {
        const error = new Error('Calificación no encontrada para actualizar');
        error.statusCode = 404;
        throw error;
    }

    return result.rows[0];
};

export const deleteCalificacion = async (id) => {
    const result = await pool.query(
        `DELETE FROM calificaciones WHERE calificacionId = $1 RETURNING *`, [id]
    );

    if (result.rows.length === 0) {
        const error = new Error('Calificación no encontrada para eliminar');
        error.statusCode = 404;
        throw error;
    }

    return result.rows[0];
};
export const getCalificacionesByPublicacionId = async (publicacionId) => {
    const result = await pool.query(
        'SELECT * FROM calificaciones WHERE publicacionId = $1',
        [publicacionId]
    );
    return result.rows;
};