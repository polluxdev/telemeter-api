const catchAsync = require('../utils/catchAsync')
const meterDb = require('../use_cases/meter')

exports.getMeters = catchAsync(async (req, res, next) => {
  req.query.user = req.user.id

  const data = await meterDb.getMeters(req.query)

  const response = {
    success: true,
    count: data.data.length,
    ...data
  }

  res.status(200).json(response)
})
