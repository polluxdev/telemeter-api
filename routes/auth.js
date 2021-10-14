const express = require('express')

const authController = require('../controllers/auth')
const { userValidationRules, validate } = require('../validator/user')

const router = express.Router()

router.post('/signup', userValidationRules(), validate, authController.signup)
router.post('/login', userValidationRules(), validate, authController.login)

module.exports = router
