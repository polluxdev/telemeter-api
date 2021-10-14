const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
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
  userValidationRules,
  validate
}
