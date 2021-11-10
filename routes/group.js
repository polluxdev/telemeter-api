const express = require('express')

const groupController = require('../controllers/group')
const authMiddleware = require('../middlewares/auth')
// const { deviceValidationRules, validate } = require('../validator/device')
const router = express.Router()

router.post('/groups', groupController.createGroup)
router.get('/groups', groupController.getGroups)
router.get('/groups/:id', groupController.getGroup)
router.patch(
  '/groups',
  authMiddleware.restrictTo('user'),
  groupController.updateGroup
)
router.delete(
  '/groups/:id',
  authMiddleware.restrictTo('user'),
  groupController.deleteGroup
)

module.exports = router
