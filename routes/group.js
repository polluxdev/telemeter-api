const express = require('express')

const groupController = require('../controllers/group')
const authMiddleware = require('../middlewares/auth')
// const { deviceValidationRules, validate } = require('../validator/device')
const router = express.Router()

router.use(authMiddleware.protectRoute)

router.post('/groups', groupController.createGroup)
router.get('/groups', groupController.getGroups)
router.get('/groups/:id', groupController.getGroup)
router.patch('/groups/:id', groupController.updateGroup)
router.delete('/groups/:id', groupController.deleteGroup)

module.exports = router
