import * as calificacionService from '../services/calificacionService.js';

export const getObtenerTodasLasCalificaciones = async (req, res, next) => {
    try {
        const result = await calificacionService.getAllCalificaciones();
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getObtenerCalificacionPorId = async (req, res, next) => {
    try {
        const result = await calificacionService.getCalificacionById(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const postCrearCalificacion = async (req, res, next) => {
    try {
        const result = await calificacionService.createCalificacion(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const putActualizarCalificacion = async (req, res, next) => {
    try {
        const result = await calificacionService.updateCalificacion(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const deleteEliminarCalificacion = async (req, res, next) => {
    try {
        const result = await calificacionService.deleteCalificacion(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getCalificacionesPorPublicacion = async (req, res, next) => {
    try {
        const result = await calificacionService.getCalificacionesByPublicacionId(req.params.publicacionId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};