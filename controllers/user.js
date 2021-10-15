const i18n = require('i18n')

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
