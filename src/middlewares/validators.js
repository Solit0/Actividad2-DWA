import {body, validationResult} from 'express-validator';

export const runValidations = (validations) =>{
    return async (req,res,next) => {
        for(const validation of validations){
            await validation.run(req);
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }

        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    };
};

export const createUserValidators = [
    body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

    body('apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es obligatorio'),

    body('nombreUsuario')
    .trim()
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 5 }).withMessage('El nombre de usuario debe tener al menos 5 caracteres.'),

    body('clave')
    .notEmpty()
    .withMessage('La clave es obligatoria')
    .isLength({ min: 8 }).withMessage('La clave debe tener al menos 8 caracteres.'),

    body('rolId')
    .notEmpty()
    .isInt().withMessage('El ID del rol debe ser un número entero')
    .withMessage('El ID del rol es obligatorio')
    .isIn([1,2]).withMessage('El ID del rol debe ser 1 (admin) o 2 (usuario)')
];

export const createPublicacionValidators = [
    body('titulo')
    .trim()
    .notEmpty()
    .isLength({ min: 5 }).withMessage('El título debe tener al menos 5 caracteres.')
    .withMessage('El título es obligatorio'),

    body('descripcion')
    .optional()
    .isString().withMessage('La descripción debe ser texto'),

    body('fechaCreacion')
    .isISO8601().withMessage('La fecha de creación debe estar en formato ISO 8601 (YYYY-MM-DD)')
    .toDate()
    .withMessage('La fecha de creación no es válida')

];
export const createComentarioValidators = [
    body('publicacionId')
        .notEmpty().withMessage('El ID de la publicación es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID de la publicación debe ser un número entero positivo'),

    body('usuarioId')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo'),

    body('comentario')
        .trim()
        .notEmpty().withMessage('El comentario es obligatorio')
        .isLength({ min: 3 }).withMessage('El comentario debe tener al menos 3 caracteres'),
];

export const updateComentarioValidators = [
    body('comentario')
        .trim()
        .notEmpty().withMessage('El comentario es obligatorio')
        .isLength({ min: 3 }).withMessage('El comentario debe tener al menos 3 caracteres'),
];

export const createCalificacionValidators = [
    body('publicacionId')
        .notEmpty().withMessage('El ID de la publicación es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID de la publicación debe ser un número entero positivo'),

    body('usuarioId')
        .notEmpty().withMessage('El ID del usuario es obligatorio')
        .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo'),

    body('calificacion')
        .notEmpty().withMessage('La calificación es obligatoria')
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe estar entre 1 y 5'),
];

export const updateCalificacionValidators = [
    body('calificacion')
        .notEmpty().withMessage('La calificación es obligatoria')
        .isInt({ min: 1, max: 5 }).withMessage('La calificación debe estar entre 1 y 5'),
];
