const { body, validationResult } = require('express-validator')

const deviceValidationRules = () => {
  return [
    body('name')
      .optional()
      .isLength({ min: 2 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.device.length')
      })
      .isString()
      .withMessage((_, { req }) => {
        return req.__('error.validator.device.string')
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
    message: res.__('error.validator.error'),
    errors: extractedErrors
  })
}

module.exports = {
  deviceValidationRules,
  validate
}
