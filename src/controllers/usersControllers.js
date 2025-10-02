import * as userService from '../services/usersServices.js';

export const getObtenerTodosLosUsuarios = async (req,res,next) => {
    try{
        const result = await userService.getAllUsers();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const getObtenerPorRol = async (req,res,next) => {
    try{
        const result = await userService.getUserByRol();
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

export const getBuscarApellido = async (req,res,next) => {
    try{
        const result = await userService.getUserByApellido();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const postCrearUsuario = async (req,res,next) => {
    try{
        const{nombreUsuario, clave, nombre, apellido} = req.body;
        const newUser = await userService.postCrearUsuario(nombreUsuario, clave, nombre, apellido);
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
        const {usuarioId} = req.params;
        const result = await userService.eliminarUsuario(usuarioId);
        res.status(200).json(result);
    }catch(err){
        return next(err);
    }
};