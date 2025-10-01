import * as userService from '../services/usersServices.js';

export const getObtenerTodosLosUsuarios = async (req,res,next) => {
    try{
        const result = await userService.getAllUsers();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const getObtenerPorEmail = async (req,res,next) => {
    try{
        const result = await userService.getUserByEmail();
        res.json(result);
    }catch(err){
        return next(err);
    }
};
export const getBuscarNombre = async (req,res,next) => {
    try{
        const result = await userService.getBuscarNombre();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const postCrearUsuario = async (req,res,next) => {
    try{
        const{nombre,documento,carnet,email,contrasenia} = req.body;
        const newUser = await userService.postCrearUsuario(nombre,documento,carnet,email,contrasenia);
        res.status(201).json(newUser);
    }catch(err){
        return next(err);
    }
};
export const putActualizarUsuario = async (req,res,next) => {
    try{
        const result = await userService.ActualizarUsuario();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const deleteEliminarUsuario = async (req,res,next) => {
    try{
        const {id_usuario} = req.params;
        const result = await userService.eliminarUsuario(id_usuario);
        res.status(200).json(result);
    }catch(err){
        return next(err);
    }
};