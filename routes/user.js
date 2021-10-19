const express = require('express')

const userController = require('../controllers/user')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware.protectRoute, authMiddleware.restrictTo('user'))

router.post('/users', userController.getUsers)
router.post('/users/:id', userController.getUser)
router.patch('/users/:id', userController.updateUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router
