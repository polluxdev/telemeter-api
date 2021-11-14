const express = require('express')

const authRoutes = require('./auth')
const profileRoutes = require('./profile')
const dashboardRoutes = require('./dashboard')
const groupRoutes = require('./group')
const deviceRoutes = require('./device')
const userRoutes = require('./user')

const authMiddleware = require('../middlewares/auth')

const router = express.Router()

router.use('/', authRoutes)

router.use(authMiddleware.protectRoute)

router.use('/', profileRoutes)
router.use('/', dashboardRoutes)
router.use('/', groupRoutes)
router.use('/', deviceRoutes)
router.use('/', userRoutes)

module.exports = router
