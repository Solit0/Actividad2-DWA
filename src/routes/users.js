import {Router} from 'express';
import * as userController from '../controllers/usersControllers.js';
import {createUserValidators, runValidations} from '../middlewares/validators.js';

const router = Router();

router.get('/',userController.getObtenerTodosLosUsuarios);
router.get('/buscarPorEmail/:email', userController.getObtenerPorEmail);
router.get('/buscarPorNombre/:nombre', userController.getBuscarNombre);
router.post('/', runValidations(createUserValidators),userController.postCrearUsuario);
router.put('/:id_usuario', userController.putActualizarUsuario);
router.delete('/:id_usuario', userController.deleteEliminarUsuario);

export default router;