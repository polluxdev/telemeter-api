const express = require('express')

const deviceController = require('../controllers/device')
const authMiddleware = require('../middlewares/auth')
const { deviceValidationRules, validate } = require('../validator/device')
const router = express.Router()

router.get(
  '/devices',
  authMiddleware.restrictTo('user'),
  deviceController.getDevices
)
router.post(
  '/devices',
  deviceValidationRules(),
  validate,
  authMiddleware.restrictTo('user'),
  deviceController.createDevice
)
router.get('/devices/:id', deviceController.getDevice)
router.patch(
  '/devices/:id',
  authMiddleware.restrictTo('user'),
  deviceController.updateDevice
)
router.delete(
  '/devices/:id',
  authMiddleware.restrictTo('user'),
  deviceController.deleteDevice
)

module.exports = router
