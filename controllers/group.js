const i18n = require('i18n')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const groupDb = require('../use_cases/group')

exports.createGroup = catchAsync(async (req, res, next) => {
  if (req.body.regionName) {
    const group = await groupDb.getGroup(req.body)
    if (group) {
      throw new AppError(i18n.__('error.group.already_exists'), 422)
    }
  }

  req.body.admin = req.user.id
  const data = await groupDb.createGroup(req.body)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.getGroups = catchAsync(async (req, res, next) => {
  const data = await groupDb.getGroups(req.query)

  const response = {
    success: true,
    count: data.data.length,
    ...data
  }

  res.status(200).json(response)
})

exports.getGroup = catchAsync(async (req, res, next) => {
  const data = await groupDb.getGroup(req.params.id)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.updateGroup = catchAsync(async (req, res, next) => {
  const reqBody = req.body
  if (!reqBody.user && req.user.role != 'super') {
    reqBody.user = req.user.id
  }
  const data = await groupDb.updateGroup(reqBody)

  const response = {
    success: true,
    data
  }

  res.status(201).json(response)
})

exports.deleteGroup = catchAsync(async (req, res, next) => {
  await groupDb.deleteGroup(req.params.id)

  const response = {
    success: true,
    message: i18n.__('success.group.deleted')
  }

  res.status(200).json(response)
})

exports.insertUser = catchAsync(async (req, res, next) => {
  const data = await groupDb.insertUser(req.params.id, req.body)

  const response = {
    success: true,
    message: 'Insert data successfully',
    data
  }

  res.status(201).json(response)
})
