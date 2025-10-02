import {pool} from '../db.js';

export const getAllComentarios = async () => {
    const result = await pool.query('SELECT * FROM comentarios');
    return result.rows;
};
export const getComentarioById = async (id) => {
    const result = await pool.query('SELECT * FROM comentarios WHERE comentarioId = $1', [id]);
    if (result.rows.length === 0) {
        const error = new Error('Comentario no encontrado');
        error.statusCode = 404;
        throw error;
    }
    return result.rows[0];
};

export const createComentario = async ({ publicacionId, usuarioId, comentario }) => {
    const result = await pool.query(
        `INSERT INTO comentarios (publicacionId, usuarioId, comentario) VALUES ($1, $2, $3) RETURNING *`, [publicacionId, usuarioId, comentario]);
    return result.rows[0];
};

export const updateComentario = async (id, { comentario }) => {
    const result = await pool.query(
        `UPDATE comentarios SET comentario = $1 WHERE comentarioId = $2 RETURNING *`, [comentario, id]
    );

    if (result.rows.length === 0) {
        const error = new Error('Comentario no encontrado para actualizar');
        error.statusCode = 404;
        throw error;
    }
    return result.rows[0];
};

export const deleteComentario = async (id) => {
    const result = await pool.query(
        'DELETE FROM comentarios WHERE comentarioId = $1 RETURNING *', [id]
    );
    if (result.rows.length === 0) {
        const error = new Error('Comentario no encontrado para eliminar');
        error.statusCode = 404;
        throw error;
    }
    return result.rows[0];
};
export const getComentariosByPublicacionId = async (publicacionId) => {
    const result = await pool.query(
        'SELECT * FROM comentarios WHERE publicacionId = $1',
        [publicacionId]
    );
    return result.rows;
};

export const getComentariosByUsuarioId = async (usuarioId) => {
    const result = await pool.query(
        'SELECT * FROM comentarios WHERE usuarioId = $1',
        [usuarioId]
    );
    return result.rows;
};