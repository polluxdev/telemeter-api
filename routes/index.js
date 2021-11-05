const express = require('express')

const authRoutes = require('./auth')
const profileRoutes = require('./profile')
const groupRoutes = require('./group')
const deviceRoutes = require('./device')
const userRoutes = require('./user')

const router = express.Router()

router.use('/', authRoutes)
router.use('/', profileRoutes)
router.use('/', groupRoutes)
router.use('/', deviceRoutes)
router.use('/', userRoutes)

module.exports = router
