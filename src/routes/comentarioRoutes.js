import express from 'express';
import * as comentarioController from '../controllers/comentarioController.js';

const router = express.Router();
router.get('/publicacion/:publicacionId', comentarioController.getComentariosPorPublicacion);
router.get('/usuario/:usuarioId', comentarioController.getComentariosPorUsuario);
router.get('/', comentarioController.getObtenerTodosLosComentarios);
router.get('/:id', comentarioController.getObtenerComentarioPorId);
router.post('/', comentarioController.postCrearComentario);
router.put('/:id', comentarioController.putActualizarComentario);
router.delete('/:id', comentarioController.deleteEliminarComentario);

export default router;