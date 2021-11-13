const catchAsync = require('../utils/catchAsync')
const aggregationDb = require('../use_cases/dashboard')

exports.getUsersCount = catchAsync(async (req, res, next) => {
  const query = { ...req.query }
  query.group = req.user.group
  const count = await aggregationDb.getUsersCount(query)

  const response = {
    success: true,
    count
  }

  res.status(200).json(response)
})

exports.getMeterTotal = catchAsync(async (req, res, next) => {
  const query = { ...req.query }
  query.group = req.user.group
  const count = await aggregationDb.getMeterTotal(query)

  const response = {
    success: true,
    count
  }

  res.status(200).json(response)
})
