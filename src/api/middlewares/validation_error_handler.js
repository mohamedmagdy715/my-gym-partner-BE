const httpStatus = require('http-status')
const { validationResult } = require('express-validator')

// Handles controller-level validation errors
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      errors: errors.array()
    })
  }

  next()
}

module.exports = validationErrorHandler
