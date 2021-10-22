const express = require('express')

const authRoutes = require('./auth')
const userRoutes = require('./user')
const deviceRoutes = require('./device')

const router = express.Router()

router.use('/', authRoutes)
router.use('/', userRoutes)
router.use('/', deviceRoutes)

module.exports = router
