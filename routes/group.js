const express = require('express')

const groupController = require('../controllers/group')
const authMiddleware = require('../middlewares/auth')
const { groupValidationRules, validate } = require('../validator/group')
const router = express.Router()

router.post(
  '/groups',
  groupValidationRules(),
  validate,
  groupController.createGroup
)
router.get('/groups', groupController.getGroups)
router.get('/groups/:id', groupController.getGroup)
router.patch('/groups', groupController.updateGroup)
router.patch(
  '/groups/user/:id',
  authMiddleware.restrictTo('user'),
  groupController.insertUser
)
router.delete(
  '/groups/:id',
  authMiddleware.restrictTo('user'),
  groupController.deleteGroup
)

module.exports = router
