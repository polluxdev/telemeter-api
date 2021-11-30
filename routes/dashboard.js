const express = require('express')

const dashboardController = require('../controllers/dashboard')

const router = express.Router()

router.get('/users/count', dashboardController.getUsersCount)
router.get('/meters/total', dashboardController.getMeterTotal)
router.get('/meters/top', dashboardController.getTopUsage)
router.get('/meters/traffic', dashboardController.getTrafficUsage)

module.exports = router
