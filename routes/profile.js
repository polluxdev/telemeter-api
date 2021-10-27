const express = require('express')

const userController = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')
const { profileValidationRules, validate } = require('../validator/user')

const router = express.Router()

router.use(authMiddleware.protectRoute, authMiddleware.checkAuth)

router.patch(
  '/profile',
  profileValidationRules(),
  validate,
  userController.updateProfile
)

module.exports = router
