import {pool} from '../db.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
    const result  = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};


export const getUserByApellido = async (apellido) => {
    const buscar = `%${apellido}%`;
    const result = await pool.query('SELECT * FROM usuarios WHERE apellido LIKE $1', [buscar]);
    return result.rows;
};

export const getBuscarNombre = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre LIKE $1', [buscar]);
    return result.rows;
};

export const getUserByRol = async (rol) => {
    const result  = await pool.query(`SELECT u.usuarioId, u.nombreUsuario, u.nombre, u.apellido, r.rol
            FROM usuarios u
            JOIN roles r ON u.rolId = r.rolId
            WHERE r.rol = $1`, [rol]);
    return result.rows;
};

export const postCrearUsuario = async (rolId, nombreUsuario, clave, nombre, apellido) => {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const claveHashed = bcrypt.hashSync(clave, salt);
    try{
        const query = `INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido) VALUES ($1, $2, $3, $4, $5) RETURNING *;`

        const result = await pool.query(query, [rolId, nombreUsuario,claveHashed, nombre, apellido]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}


export const actualizarUsuario = async (usuarioId, updates) => {
    const allowedKeys = ['nombreUsuario', 'clave', 'nombre', 'apellido'];
    const fields = [];
    const params = [];
    let paramIndex = 1;

    for (const key of allowedKeys) {
        if (updates[key] !== undefined) {
            let value = updates[key];

            if (key === 'clave') {
                if (value === null || value === '') {
                    continue; 
                }
                const salt = await bcrypt.genSalt(10);
                value = await bcrypt.hash(value, salt);
            }

            fields.push(`${key} = $${paramIndex}`);
            params.push(value);
            paramIndex++;
        }
    }
    if (fields.length === 0) {
        throw new Error("No se proporcionaron campos válidos para actualizar.");
    }
    params.push(usuarioId);
    const setClause = fields.join(', '); 

    const query = `
        UPDATE usuarios SET ${setClause} WHERE usuarioId = $${paramIndex} RETURNING usuarioId, nombreUsuario, nombre, apellido;`;
    const result = await pool.query(query, params);

    if (result.rowCount === 0) {
        throw new Error('Usuario no encontrado para actualizar');
    }
    return result.rows[0];
};

export const eliminarUsuario = async (usuarioId) => {
    const usuarioAEliminar = await pool.query(`SELECT * FROM usuarios WHERE usuarioId=$1`, [usuarioId]);
    if(usuarioAEliminar.rowCount === 0) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }
    const result = await pool.query(`DELETE FROM usuarios WHERE usuarioId=$1`, [usuarioId]);
    return {message: 'Usuario eliminado exitosamente', usuario: usuarioAEliminar.rows[0]};
}
export const getTopComentadores = async (n) => {
    const result = await pool.query(
        `SELECT u.usuarioId, u.nombreUsuario, u.nombre, u.apellido, COUNT(c.comentarioId) AS totalComentarios FROM usuarios u
        JOIN comentarios c ON u.usuarioId = c.usuarioId GROUP BY u.usuarioId ORDER BY totalComentarios DESC LIMIT $1`, [n]
    );
    return result.rows;
};