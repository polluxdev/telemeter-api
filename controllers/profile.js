const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const profileDb = require('../use_cases/profile')
const userDb = require('../use_cases/user')

exports.getProfile = catchAsync(async (req, res, next) => {
  const data = await userDb.getUser(req.user.id)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.updateProfile = catchAsync(async (req, res, next) => {
  if (req.body.hasOwnProperty('password')) {
    throw new AppError(i18n.__('error.general.not_password_update'), 400)
  }

  const data = await userDb.updateUser(req.user.id, req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.hasOwnProperty('oldPassword')) {
    throw new AppError(i18n.__('error.general.for_password_update'), 400)
  }

  const user = await profileDb.checkUser(req.params.id, req.body)
  if (!user) {
    throw new AppError(i18n.__('error.user.not_found'), 422)
  }

  const data = await userDb.updateUser(req.user.id, req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})
