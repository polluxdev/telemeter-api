const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const deviceDb = require('../use_cases/device')

exports.createDevice = catchAsync(async (req, res, next) => {
  const reqBody = { ...req.body }
  reqBody.admin = req.user.id
  reqBody.group = req.user.group.id

  if (req.body.name) {
    const device = await deviceDb.getDevice(req.body)
    if (device) {
      throw new AppError(i18n.__('error.device.already_exists'), 422)
    }
  }

  const data = await deviceDb.createDevice(reqBody)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.getDevices = catchAsync(async (req, res, next) => {
  const reqQuery = { ...req.query }
  reqQuery.group = req.user.group.id

  const data = await deviceDb.getDevices(reqQuery)

  const response = {
    success: true,
    count: data.data.length,
    ...data
  }

  res.status(200).json(response)
})

exports.getDevice = catchAsync(async (req, res, next) => {
  const data = await deviceDb.getDevice({ _id: req.params.id })

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
    message: i18n.__('success.device.deleted')
  }

  res.status(200).json(response)
})
