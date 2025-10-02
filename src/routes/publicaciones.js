import {Router} from 'express';
import {createComentarioValidators, updateComentarioValidators, runValidations} from '../middlewares/validators.js';
import * as publicacionesController from '../controllers/publicacionesControllers.js';

const router = Router();
router.get('/', publicacionesController.getObtenerTodasLasPublicaciones);
router.post('/', runValidations(createComentarioValidators), comentarioController.postCrearComentario);
router.put('/:id', runValidations(updateComentarioValidators), comentarioController.putActualizarComentario);
router.delete('/:publicacionId', publicacionesController.deleteEliminarPublicacion);

export default router;