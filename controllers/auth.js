const i18n = require('i18n')

const catchAsync = require('../utils/catchAsync')
const authDb = require('../use_cases/auth')
const deviceDb = require('../use_cases/device')

exports.signup = catchAsync(async (req, res, next) => {
  const reqBody = req.body
  const checkUser = await authDb.checkUser(reqBody)
  if (checkUser) {
    return res.status(409).json({
      success: false,
      message: i18n.__('error.user_already_exists')
    })
  }

  reqBody.device = await deviceDb.createDevice()
  const data = await authDb.signup(reqBody)

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
