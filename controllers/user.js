const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const userDb = require('../use_cases/user')
const deviceDb = require('../use_cases/device')

exports.getUsers = catchAsync(async (req, res, next) => {
  const data = await userDb.getUsers()

  const response = {
    success: true,
    count: data.length,
    data
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
  const data = await userDb.updateUser(req.params.id, req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userDb
    .deleteUser(req.params.id)
    .then(async (user) => {
      return await deviceDb.deleteDevice(user.device)
    })
    .catch((err) => {
      console.log(err)
      throw new AppError('Delete user failed', 422)
    })

  const response = {
    success: true,
    message: 'User deleted successfully'
  }

  res.status(200).json(response)
})
