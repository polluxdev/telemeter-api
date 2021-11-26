const express = require('express')

const userController = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')
const {
  userValidationRules,
  emailValidationRules,
  validate
} = require('../validator/user')

const router = express.Router()

router.patch('/users/:id', userController.updateUser)
router.get('/users', userController.getUsers)

router.post(
  '/users',
  emailValidationRules(),
  userValidationRules(),
  validate,
  authMiddleware.restrictTo('user'),
  userController.addUsers
)
router.get(
  '/users/:id',
  authMiddleware.restrictTo('user'),
  userController.getUser
)
router.delete(
  '/users/:id',
  authMiddleware.restrictTo('user'),
  userController.deleteUser
)

module.exports = router
