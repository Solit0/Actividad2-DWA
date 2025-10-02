import {pool} from '../db.js';

export const getAllPublicaciones = async () => {
    const query = `
        SELECT p.publicacionId, p.titulo, p.descripcion, p.fechaCreacion, u.nombre, u.apellido
        FROM publicaciones p
        JOIN usuarios u ON p.usuarioId = u.usuarioId
        ORDER BY p.fechaCreacion DESC;`;
    const result = await pool.query(query);
    return result.rows;
};

export const postCrearPublicacion = async ( usuarioId, titulo, descripcion, fechaCreacion) => {
    try{
        const query = `INSERT INTO publicaciones (usuarioId, titulo, descripcion, fechaCreacion) VALUES ($1, $2, $3, $4) RETURNING *;`
        const result = await pool.query(query, [usuarioId, titulo, descripcion, fechaCreacion]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
};

export const eliminarPublicacion = async (publicacionId) => {
    const publicacionAEliminar = await pool.query(`SELECT * FROM publicaciones WHERE publicacionId=$1`, [publicacionId]);
    if(publicacionAEliminar.rowCount === 0) {
        const error = new Error('Publicación no encontrada');
        error.statusCode = 404;
        throw error;
    }
    const result = await pool.query(`DELETE FROM publicaciones WHERE publicacionId=$1`, [publicacionId]);
    return {message: 'Publicación eliminada exitosamente', publicacion: publicacionAEliminar.rows[0]};
};

export const actualizarPublicacion = async (publicacionId, updates) => {
    const { titulo, descripcion, fechaCreacion } = updates;

    const query = `
        UPDATE publicaciones 
        SET 
            titulo = COALESCE($1, titulo),
            descripcion = COALESCE($2, descripcion),
            fechaCreacion = COALESCE($3, fechaCreacion)
        WHERE publicacionId = $4
        RETURNING *;
    `;
    
    const params = [titulo, descripcion, fechaCreacion, publicacionId];
    
    try {
        const result = await pool.query(query, params);

        if(result.rowCount === 0) {

            throw new Error('Publicación no encontrada para actualizar');
        }
        return result.rows[0];
    } catch(err) {
        throw err;
    }
};
    