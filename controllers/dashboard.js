const catchAsync = require('../utils/catchAsync')
const dashboardDb = require('../use_cases/dashboard')

exports.getUsersCount = catchAsync(async (req, res, next) => {
  const query = { ...req.query }
  query.group = req.user.group
  const count = await dashboardDb.getUsersCount(query)

  const response = {
    success: true,
    count
  }

  res.status(200).json(response)
})

exports.getMeterTotal = catchAsync(async (req, res, next) => {
  const query = { ...req.query }
  query.group = req.user.group
  const data = await dashboardDb.getMeterTotal(query)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})

exports.getTopUsage = catchAsync(async (req, res, next) => {
  const query = { ...req.query }
  query.group = req.user.group
  const data = await dashboardDb.getTopUsage(query)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})
