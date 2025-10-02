import {Router} from 'express';
import * as userController from '../controllers/usersControllers.js';
import {createUserValidators, runValidations} from '../middlewares/validators.js';

const router = Router();
router.get('/topcomentarios/:n', userController.getTopComentadores);

router.get('/',userController.getObtenerTodosLosUsuarios);
router.get('/buscarPorApellido/:apellido', userController.getBuscarApellido);
router.get('/buscarPorNombre/:nombre', userController.getBuscarNombre);
router.get('/buscarPorRol/:rol', userController.getObtenerPorRol);
router.post('/', runValidations(createUserValidators),userController.postCrearUsuario);
router.put('/:usuarioId', userController.putActualizarUsuario);
router.delete('/:usuarioId', userController.deleteEliminarUsuario);

export default router;