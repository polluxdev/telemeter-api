const express = require('express')

const authRoutes = require('./auth')
const deviceRoutes = require('./device')
const userRoutes = require('./user')

const router = express.Router()

router.use('/', authRoutes)
router.use('/', deviceRoutes)
router.use('/', userRoutes)

module.exports = router
