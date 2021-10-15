const express = require('express')

const userController = require('../controllers/user')
const { userValidationRules, validate } = require('../validator/user')

const router = express.Router()

router.post('/users', userController.getUsers)

module.exports = router
