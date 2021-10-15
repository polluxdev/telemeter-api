const express = require('express')

const authController = require('../controllers/auth')
const {
  userValidationRules,
  emailValidationRules,
  validate
} = require('../validator/user')

const router = express.Router()

router.post('/signup', userValidationRules(), validate, authController.signup)
router.post(
  '/verification-email',
  emailValidationRules(),
  validate,
  authController.sendVerification
)
router.post('/login', userValidationRules(), validate, authController.login)
router.post(
  '/forgot-password',
  emailValidationRules(),
  validate,
  authController.forgotPassword
)

module.exports = router
