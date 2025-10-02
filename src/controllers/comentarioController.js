import * as comentarioService from '../services/comentarios.js';

export const getObtenerTodosLosComentarios = async (req, res, next) => {
    try {
        const result = await comentarioService.getAllComentarios();
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getObtenerComentarioPorId = async (req, res, next) => {
    try {
        const result = await comentarioService.getComentarioById(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
export const postCrearComentario = async (req, res, next) => {
    try {
        const result = await comentarioService.createComentario(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const putActualizarComentario = async (req, res, next) => {
    try {
        const result = await comentarioService.updateComentario(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
export const deleteEliminarComentario = async (req, res, next) => {
    try {
        const result = await comentarioService.deleteComentario(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
export const getComentariosPorPublicacion = async (req, res, next) => {
    try {
        const result = await comentarioService.getComentariosByPublicacionId(req.params.publicacionId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
export const getComentariosPorUsuario = async (req, res, next) => {
    try {
        const result = await comentarioService.getComentariosByUsuarioId(req.params.usuarioId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};