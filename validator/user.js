const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('name')
      .isLength({ min: 2 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.name_length')
      }),
    body('phoneNumber')
      .isLength({ min: 11 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.phone_format')
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      })
  ]
}

const loginValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.email_format')
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      })
  ]
}

const emailValidationRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.email_format')
      })
  ]
}

const changePasswordValidationRules = () => {
  return [
    body('oldPassword')
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      }),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      }),
    body('confirmNewPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(req.__('error.validator.user.password_not_match'))
      }

      return true
    })
  ]
}

const passwordValidationRules = () => {
  return [
    body('password')
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(req.__('error.validator.user.password_not_match'))
      }

      return true
    })
  ]
}

const profileValidationRules = () => {
  return [
    body('name')
      .optional()
      .isLength({ min: 2 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.name_length')
      }),
    body('phoneNumber')
      .optional()
      .isLength({ min: 11 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.phone_format')
      }),
    body('password')
      .optional()
      .isLength({ min: 8 })
      .withMessage((_, { req }) => {
        return req.__('error.validator.user.password_length')
      }),
    body('confirmPassword')
      .optional()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(req.__('error.validator.user.password_not_match'))
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
    message: res.__('error.validator.error'),
    errors: extractedErrors
  })
}

module.exports = {
  userValidationRules,
  loginValidationRules,
  emailValidationRules,
  changePasswordValidationRules,
  passwordValidationRules,
  profileValidationRules,
  validate
}
