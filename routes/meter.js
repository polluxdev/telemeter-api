const express = require('express')

const meterController = require('../controllers/meter')
const router = express.Router()

router.get('/meters', meterController.getMeters)

module.exports = router
