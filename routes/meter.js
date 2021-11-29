const express = require('express')

const meterController = require('../controllers/meter')
const router = express.Router()

router.get('/meters', meterController.getMeters)
router.get('/meters/la', meterController.getMeter)

module.exports = router
