const { body, validationResult } = require('express-validator')

const deviceValidationRules = () => {
  return [
    body('name')
      .optional()
      .isLength({ min: 2 })
      .withMessage('Device name must be at least 2 characters')
      .isString()
      .withMessage('Device name must be string')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    success: false,
    message: 'Validation error',
    errors: extractedErrors
  })
}

module.exports = {
  deviceValidationRules,
  validate
}
