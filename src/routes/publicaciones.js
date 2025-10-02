import {Router} from 'express';
import {createPublicacionValidators, runValidations} from '../middlewares/validators.js';
import * as publicacionesController from '../controllers/publicacionesControllers.js';

const router = Router();
router.get('/', publicacionesController.getObtenerTodasLasPublicaciones);
router.post('/', runValidations(createPublicacionValidators), publicacionesController.postCrearPublicacion);
router.put('/:publicacionId', publicacionesController.putActualizarPublicacion);
router.delete('/:publicacionId', publicacionesController.deleteEliminarPublicacion);

export default router;