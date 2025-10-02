import {poool} from '../db.js';

export const getAllCalificaciones = async () => {
    const result  = await pool.query('SELECT * FROM calificaciones');
    return result.rows;
}

export const postCrearCalificacion = async (calificacion) => {
    
}