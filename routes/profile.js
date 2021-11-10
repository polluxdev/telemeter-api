const express = require('express')

const profileController = require('../controllers/profile')
const {
  profileValidationRules,
  changePasswordValidationRules,
  validate
} = require('../validator/user')

const router = express.Router()

router.get('/profile', profileController.getProfile)
router.patch(
  '/profile',
  profileValidationRules(),
  validate,
  profileController.updateProfile
)
router.patch(
  '/password',
  changePasswordValidationRules(),
  validate,
  profileController.updatePassword
)

module.exports = router
