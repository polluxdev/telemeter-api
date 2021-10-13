const i18n = require('i18n')

const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const authDb = require('../use_cases/auth')

exports.signup = catchAsync(async (req, res, next) => {
  const currentUser = await User.findOne({ email: req.body.email }).exec()
  if (currentUser) {
    res.status(409).json({
      success: false,
      message: i18n.__('error.user_already_exists')
    })
  }

  const data = await authDb.signup(req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.login = catchAsync(async (req, res, next) => {
  const data = await authDb.login(req.body)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})
