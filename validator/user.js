const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('phoneNumber')
      .isLength({ min: 11 })
      .withMessage('Phone format is not valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
  ]
}

const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
  ]
}

const emailValidationRules = () => {
  return [body('email').isEmail().withMessage('Email is not valid')]
}

const passwordValidationRules = () => {
  return [
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm password does not match password')
      }

      return true
    })
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
  loginValidationRules,
  emailValidationRules,
  passwordValidationRules,
  validate
}
