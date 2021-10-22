const express = require('express')

const authController = require('../controllers/auth')
const {
  userValidationRules,
  loginValidationRules,
  emailValidationRules,
  passwordValidationRules,
  validate
} = require('../validator/user')

const router = express.Router()

router.post('/signup', emailValidationRules(), validate, authController.signup)
router.post('/login', loginValidationRules(), validate, authController.login)
router.post(
  '/register',
  userValidationRules(),
  validate,
  authController.register
)
router.post(
  '/forgot-password',
  emailValidationRules(),
  validate,
  authController.forgotPassword
)
router.post(
  '/reset-password',
  passwordValidationRules(),
  validate,
  authController.resetPassword
)

module.exports = router
