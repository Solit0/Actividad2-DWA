import {pool} from '../db.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
    const result  = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};


export const getUserByEmail = async (req,res) => {
    const { email } = req.params;
    try{
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const getBuscarNombre = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre LIKE $1', [buscar]);
    return result.rows;
};

export const postCrearUsuario = async (nombre,documento,carnet,email,contrasenia) => {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const contraseniaHashed = bcrypt.hashSync(contrasenia, salt);
    try{
        const query = `INSERT INTO usuarios (nombre, documento, carnet, email, contrasenia, bloqueado, ultimo_login, activo) VALUES ($1, $2, $3, $4, $5, 'N', null, 'A') RETURNING *;`

        const result = await pool.query(query, [nombre,documento,carnet,email,contraseniaHashed]);
        return result.rows[0];
    }catch(err){
        throw err;
    }
}

export const actualizarUsuario = async (usuario) =>{
    const query = `UPDATE usuarios SET nombre=$1, documento=$2, carnet=$3, email=$4, contrasenia=$5 WHERE id_usuario=$6 RETURNING *;`

    try{
        const result = await pool.query(query, usuario);

        if(result.rowCount === 0) return result.status(404).json({message: 'Usuario no encontrado'});
        return result.rows[0];
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const eliminarUsuario = async (id_usuario) => {
    const usuarioAEliminar = await pool.query(`SELECT * FROM usuarios WHERE id_usuario=$1`, [id_usuario]);
    if(usuarioAEliminar.rowCount === 0) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }
    const result = await pool.query(`DELETE FROM usuarios WHERE id_usuario=$1`, [id_usuario]);
    return {message: 'Usuario eliminado exitosamente', usuario: usuarioAEliminar.rows[0]};
}
