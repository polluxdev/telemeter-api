const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const userDb = require('../use_cases/user')
const deviceDb = require('../use_cases/device')

exports.createDevice = catchAsync(async (req, res, next) => {
  const data = await deviceDb.createDevice(req.body)

  await userDb.updateUser(req.user.id, { device: data.id })

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.getDevices = catchAsync(async (req, res, next) => {
  const data = await deviceDb.getDevices()

  const response = {
    success: true,
    count: data.length,
    data
  }

  res.status(200).json(response)
})

exports.getDevice = catchAsync(async (req, res, next) => {
  const data = await deviceDb.getDevice(req.params.id)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.updateDevice = catchAsync(async (req, res, next) => {
  const data = await deviceDb.updateDevice(req.params.id, req.body)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.deleteDevice = catchAsync(async (req, res, next) => {
  await deviceDb.deleteDevice(req.params.id)

  const response = {
    success: true,
    message: 'Device deleted successfully'
  }

  res.status(200).json(response)
})
