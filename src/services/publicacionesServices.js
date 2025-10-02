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

export const postCrearPublicacion = async (titulo, descripcion, fechaCreacion) => {
    try{
        const query = `INSERT INTO publicaciones (titulo, descripcion, fechaCreacion) VALUES ($1, $2, $3) RETURNING *;`
        const result = await pool.query(query, [titulo, descripcion, fechaCreacion]);
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
    return {message: 'Usuario eliminado exitosamente', publicacion: publicacionAEliminar.rows[0]};
};

export const actualizarPublicacion = async (publicacion) =>{
     const query = `UPDATE publicaciones SET titulo=$1, descripcion=$2, fechaCreacion=$3  WHERE publicacionId=$4 RETURNING *;`

    try{
        const result = await pool.query(query, publicacion);

        if(result.rowCount === 0) return result.status(404).json({message: 'Publicación no encontrada'});
        return result.rows[0];
    }catch(err){
        throw err;
    }
};
    