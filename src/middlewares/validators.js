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

    body('email')
    .trim()
    .isEmail()
    .withMessage('El email no es válido'),

    body('contrasenia')
    .isLength({min: 6})
    .withMessage('La contraseña debe tener al menos 6 caracteres')
];



