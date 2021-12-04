const catchAsync = require('../utils/catchAsync')
const meterDb = require('../use_cases/meter')

exports.getMeters = catchAsync(async (req, res, next) => {
  if (req.user.role != 'super') {
    req.query.user = req.user.id
  }

  const data = await meterDb.getMeters(req.query)

  const response = {
    success: true,
    count: data.data.length,
    ...data
  }

  res.status(200).json(response)
})

exports.getMeter = catchAsync(async (req, res, next) => {
  const param = {}
  if (req.user.device) {
    Object.assign(param, {
      user: req.user.id,
      device: req.user.device.id
    })
  }

  const data = await meterDb.getMeter(param)

  const response = {
    success: true,
    data
  }

  res.status(200).json(response)
})
