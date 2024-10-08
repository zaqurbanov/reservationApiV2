const { check } = require("express-validator")


const addReservationValidation = [
    check('name')
      .notEmpty()
      .withMessage('Name is required'),
    check('date')
      .isISO8601()
      .withMessage('Please provide a valid date'),
    check('time')
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Please provide a valid time in HH:mm format')
]

module.exports = addReservationValidation