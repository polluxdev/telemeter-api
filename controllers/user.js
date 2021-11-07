const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const userDb = require('../use_cases/user')

exports.addUsers = catchAsync(async (req, res, next) => {
  const reqBody = req.body

  const user = await userDb.checkUser('email', reqBody.email)
  if (user) {
    throw new AppError(i18n.__('error.user.already_exists'), 422)
  }

  const data = await userDb.addUser(reqBody)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.getUsers = catchAsync(async (req, res, next) => {
  const query = { groups: req.user.groups, ...req.query }
  const data = await userDb.getUsers(query)

  const response = {
    success: true,
    count: data.data.length,
    ...data
  }

  res.status(200).json(response)
})

exports.getUser = catchAsync(async (req, res, next) => {
  const data = await userDb.getUser(req.params.id)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.hasOwnProperty('password')) {
    throw new AppError(i18n.__('error.general.not_password_update'), 400)
  }

  const data = await userDb.updateUser(req.params.id, req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  const data = await userDb.deleteUser(req.params.id)

  const response = {
    success: true,
    message: i18n.__('success.user.deleted'),
    data
  }

  res.status(200).json(response)
})
