import express from 'express';
import * as comentarioController from '../controllers/comentarioController.js';
import {createComentarioValidators, updateComentarioValidators, runValidations} from '../middlewares/validators.js';
const router = express.Router();
router.get('/publicacion/:publicacionId', comentarioController.getComentariosPorPublicacion);
router.get('/usuario/:usuarioId', comentarioController.getComentariosPorUsuario);
router.get('/', comentarioController.getObtenerTodosLosComentarios);
router.get('/:id', comentarioController.getObtenerComentarioPorId);
router.post('/', runValidations(createComentarioValidators), comentarioController.postCrearComentario);
router.put('/:id', runValidations(updateComentarioValidators), comentarioController.putActualizarComentario);
router.delete('/:id', comentarioController.deleteEliminarComentario);

export default router;