const { check } = require("express-validator")

const registerValidation =   [
        check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
      check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
      check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
    ]


module.exports= registerValidation