import {pool} from '../db.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
    const result  = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};


export const getUserByApellido = async (apellido) => {
    const { buscar } = `%${apellido}%`;
    const result = await pool.query('SELECT * FROM usuarios WHERE apellido LIKE $1', [buscar]);
    return result.rows;
};

export const getBuscarNombre = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre LIKE $1', [buscar]);
    return result.rows;
};

export const getUserByRol = async (rol) => {
    const {buscar} = `%${rol}%`;
    const result  = await pool.query(`SELECT u.usuarioId, u.nombreUsuario, u.nombre, u.apellido, r.rol
            FROM usuarios u
            JOIN roles r ON u.rolId = r.rolId
            WHERE r.rol = $1`, [buscar]);
    return result.rows;
};

export const postCrearUsuario = async (nombreUsuario, clave, nombre, apellido) => {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const claveHashed = bcrypt.hashSync(clave, salt);
    try{
        const query = `INSERT INTO usuarios (nombreUsuario, clave, nombre, apellido) VALUES ($1, $2, $3, $4) RETURNING *;`

        const result = await pool.query(query, [nombreUsuario,claveHashed, nombre, apellido]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}

export const actualizarUsuario = async (usuario) =>{
    const query = `UPDATE usuarios SET nombreUsuario=$1, clave=$2, nombre=$3, apellido=$4  WHERE id_usuario=$5 RETURNING *;`

    try{
        const result = await pool.query(query, usuario);

        if(result.rowCount === 0) return result.status(404).json({message: 'Usuario no encontrado'});
        return result.rows[0];
    }catch(err){
        throw err;
    }
}

export const eliminarUsuario = async (usuarioId) => {
    const usuarioAEliminar = await pool.query(`SELECT * FROM usuarios WHERE id_usuario=$1`, [usuarioId]);
    if(usuarioAEliminar.rowCount === 0) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }
    const result = await pool.query(`DELETE FROM usuarios WHERE id_usuario=$1`, [usuarioId]);
    return {message: 'Usuario eliminado exitosamente', usuario: usuarioAEliminar.rows[0]};
}
