const express = require('express')

const deviceController = require('../controllers/device')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.use(authMiddleware.protectRoute)

router.post('/devices', deviceController.getDevices)
router.post('/devices/:id', deviceController.getDevice)
router.patch('/devices/:id', deviceController.updateDevice)
router.delete('/devices/:id', deviceController.deleteDevice)

module.exports = router
