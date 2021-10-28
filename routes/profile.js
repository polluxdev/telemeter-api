const express = require('express')

const profileController = require('../controllers/profile')
const authMiddleware = require('../middlewares/auth')
const {
  profileValidationRules,
  changePasswordValidationRules,
  validate
} = require('../validator/user')

const router = express.Router()

router.use(authMiddleware.protectRoute, authMiddleware.checkAuth)

router.get('/users/:id/profile', profileController.getProfile)
router.patch(
  '/users/:id/profile',
  profileValidationRules(),
  validate,
  profileController.updateProfile
)
router.patch(
  '/users/:id/password',
  changePasswordValidationRules(),
  validate,
  profileController.updatePassword
)

module.exports = router
