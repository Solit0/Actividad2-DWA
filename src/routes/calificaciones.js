import express from 'express';
import * as calificacionController from '../controllers/calificacionControllers.js';

const router = express.Router();
router.get('/publicacion/:publicacionId', calificacionController.getCalificacionesPorPublicacion);
router.get('/', calificacionController.getObtenerTodasLasCalificaciones);
router.get('/:id', calificacionController.getObtenerCalificacionPorId);
router.post('/', calificacionController.postCrearCalificacion);
router.put('/:id', calificacionController.putActualizarCalificacion);
router.delete('/:id', calificacionController.deleteEliminarCalificacion);

export default router;