const express = require('express')

const userController = require('../controllers/user')
const { userValidationRules, validate } = require('../validator/user')

const router = express.Router()

router.post('/users', userController.getUsers)
router.post('/users/:id', userController.getUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router
