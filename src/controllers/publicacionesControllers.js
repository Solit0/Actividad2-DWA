import * as publicacionService from '../services/publicacionesServices.js';

export const getObtenerTodasLasPublicaciones = async (req,res,next) => {
    try{
        const result = await publicacionService.getAllPublicaciones();
        res.json(result);
    }catch(err){
        return next(err);
        }
};

export const postCrearPublicacion = async (req,res,next) => {
    try{
        const{titulo, descripcion, fechaCreacion} = req.body;
        const newPublicacion = await publicacionService.postCrearPublicacion(titulo, descripcion, fechaCreacion);
        res.status(201).json(newPublicacion);
    }catch(err){
        return next(err);
    }
};

export const putActualizarPublicacion = async (req,res,next) => {
    try{
        const result = await publicacionService.actualizarPublicacion();
        res.json(result);
    }catch(err){
        return next(err);
    }
};

export const deleteEliminarPublicacion = async (req,res,next) => {
    try{
        const {publicacionId} = req.params;
        const result = await publicacionService.eliminarPublicacion(publicacionId);
        res.status(200).json(result);
    }catch(err){
        return next(err);
    }
};