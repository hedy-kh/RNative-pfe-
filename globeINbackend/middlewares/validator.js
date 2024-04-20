const { check ,validationResult} = require('express-validator');
exports.validateUser = [
    check('name')
        .trim().not().isEmpty().withMessage('Name is required').isLength({min:3,max:20})
        .withMessage('invalid name, name must be 3 to 20 characters '),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('password')
        .trim().not().isEmpty().withMessage('password is missing')
        .isLength({min:8,max:20}).withMessage('password must be more than 8 characters and less than 20')
];

exports.validate = (req,res,next)=>{
    const error = validationResult(req).array();
    if(!error.length) return next();
    res.status(400).json({success:false,error:error[0].msg});
};
exports.validateProduct = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 50 })
        .withMessage('Invalid name, name must be 3 to 50 characters'),
    check('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Description must not exceed 255 characters'),
    check('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number'),
    check('location.coordinates')
        .isArray({ min: 2, max: 2 })
        .withMessage('Location coordinates must be an array of length 2'),
    check('location.coordinates.*')
        .isNumeric()
        .withMessage('Coordinates must be numeric'),
    check('active')
        .optional()
        .isBoolean()
        .withMessage('Active must be a boolean')
];

exports.validateProductUpdate = [
    check('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Invalid name, name must be 3 to 50 characters'),
    check('description')
        .optional()
        .isLength({ max: 255 })
        .withMessage('Description must not exceed 255 characters'),
    check('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a number'),
    check('location.coordinates')
        .optional()
        .isArray({ min: 2, max: 2 })
        .withMessage('Location coordinates must be an array of length 2'),
    check('location.coordinates.*')
        .optional()
        .isNumeric()
        .withMessage('Coordinates must be numeric'),
    check('active')
        .optional()
        .isBoolean()
        .withMessage('Active must be a boolean')
];