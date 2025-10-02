import express from 'express';
import * as calificacionController from '../controllers/calificacionControllers.js';
import { createCalificacionValidators, updateCalificacionValidators, runValidations} from '../middlewares/validators.js';

const router = express.Router();
router.get('/publicacion/:publicacionId', calificacionController.getCalificacionesPorPublicacion);
router.get('/', calificacionController.getObtenerTodasLasCalificaciones);
router.get('/:id', calificacionController.getObtenerCalificacionPorId);
router.post('/', runValidations(createCalificacionValidators), calificacionController.postCrearCalificacion);
router.put('/:id', runValidations(updateCalificacionValidators), calificacionController.putActualizarCalificacion);
router.delete('/:id', calificacionController.deleteEliminarCalificacion);

export default router;