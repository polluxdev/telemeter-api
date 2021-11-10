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

router.use(authMiddleware.restrictTo('user'))

router.post(
  '/users',
  emailValidationRules(),
  userValidationRules(),
  validate,
  userController.addUsers
)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router
