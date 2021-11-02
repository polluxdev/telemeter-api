const express = require('express')

const deviceController = require('../controllers/device')
const authMiddleware = require('../middlewares/auth')
const { deviceValidationRules, validate } = require('../validator/device')
const router = express.Router()

router.use(authMiddleware.protectRoute, authMiddleware.restrictTo('user'))

router.get('/devices', deviceController.getDevices)
router.post(
  '/devices',
  deviceValidationRules(),
  validate,
  deviceController.createDevice
)
router.get('/devices/:id', deviceController.getDevice)
router.patch('/devices/:id', deviceController.updateDevice)
router.delete('/devices/:id', deviceController.deleteDevice)

module.exports = router
