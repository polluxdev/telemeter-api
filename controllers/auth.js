const catchAsync = require('../utils/catchAsync')
const authDb = require('../use_cases/auth')
const i18n = require('i18n')

exports.signup = catchAsync(async (req, res, next) => {
  const data = await authDb.signup(req.body)

  const response = {
    status: 'success',
    data,
    message: i18n.__('index')
  }

  res.status(201).json(response)
})

exports.login = catchAsync(async (req, res, next) => {
  const data = await authDb.login(req.body)

  const response = {
    status: 'success',
    data,
    message: req.__('index')
  }

  res.status(200).json(response)
})
